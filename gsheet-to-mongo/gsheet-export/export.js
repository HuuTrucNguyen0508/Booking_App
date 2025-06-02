// gsheet-to-mongo/export.js
const axios = require('axios');
const Papa = require('papaparse');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Allow .env to override, though docker-compose will primarily set them

// Configuration
const SHEET_ID = process.env.SHEET_ID; // This MUST be set in .env or docker-compose
const SHEET_NAMES_STR = process.env.SHEET_NAMES || 'Owner,Property,Bookings,User'; // Default if not set
const SHEET_NAMES = SHEET_NAMES_STR.split(',').map(name => name.trim());

// MONGO_URI will be 'mongodb://mongo:27017' when run by docker-compose in the 'data-ingester' service
// For local dev without Docker, you might set MONGO_URI=mongodb://localhost:27017 in your .env
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017';
const DB_NAME = process.env.DB_NAME || 'gsheet_mirror';

if (!SHEET_ID) {
  console.error('❌ CRITICAL ERROR: SHEET_ID is not defined in environment variables.');
  process.exit(1);
}
if (SHEET_NAMES.length === 0 || (SHEET_NAMES.length === 1 && SHEET_NAMES[0] === '')) {
  console.error('❌ CRITICAL ERROR: SHEET_NAMES is not defined or is empty. Please set it in .env or docker-compose (e.g., "Sheet1,Sheet2").');
  process.exit(1);
}


async function fetchSheetCSV(sheetName) {
  const encodedSheetName = encodeURIComponent(sheetName); // Ensure sheet name is properly URL encoded
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodedSheetName}`;
  console.log(`Attempting to fetch: ${url}`);
  try {
    const res = await axios.get(url);
    return new Promise((resolve, reject) => { // Added reject for error handling
      Papa.parse(res.data, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (result.errors.length > 0) {
            console.error(`Error parsing CSV for ${sheetName}:`, result.errors);
            // Check if it's because the sheet doesn't exist or data is malformed
            if (res.data.includes("gid=0") && res.data.includes("譚깅襬") && res.data.includes("Unable to parse range")) {
                 // Heuristic for "Sheet not found" - Google Sheets CSV export might return a generic HTML error page
                reject(new Error(`Sheet "${sheetName}" not found or inaccessible. Check sheet name and sharing settings.`));
                return;
            }
            // For other parsing errors, provide some data
            reject(new Error(`CSV parsing error for sheet "${sheetName}". First error: ${result.errors[0].message}`));
            return;
          }
          resolve(result.data);
        },
        error: (err) => { // PapaParse specific error callback
            console.error(`PapaParse error for ${sheetName}:`, err);
            reject(new Error(`PapaParse processing error for sheet "${sheetName}": ${err.message}`));
        }
      });
    });
  } catch (error) {
    // Axios error (e.g., network issue, 404 if URL itself is bad before sheet name problems)
    let message = `Failed to fetch sheet "${sheetName}".`;
    if (error.response) {
        message += ` Status: ${error.response.status}. Data: ${typeof error.response.data === 'string' ? error.response.data.substring(0, 200) : 'Non-string response body'}`;
        // Heuristic for "Sheet not found" based on common Google Sheets error message in HTML response
        if (typeof error.response.data === 'string' && error.response.data.includes("gid=0") && error.response.data.includes("譚깅襬") && error.response.data.includes("Unable to parse range")) {
             message = `Sheet "${sheetName}" not found or inaccessible. Check sheet name and sharing settings.`;
        }
    } else if (error.request) {
        message += ` No response received.`;
    } else {
        message += ` Error: ${error.message}`;
    }
    throw new Error(message);
  }
}

async function insertToMongo(sheetName, data) {
  if (!data || data.length === 0) {
    console.log(`ℹ️ No data to insert for ${sheetName}. Skipping.`);
    return;
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collectionName = sheetName.toLowerCase().replace(/ /g, '_'); // Sanitize further: replace spaces with underscores
    const col = db.collection(collectionName);
    await col.deleteMany({});
    await col.insertMany(data);
    console.log(`✅ Inserted ${data.length} rows into '${collectionName}' from sheet '${sheetName}' in database '${DB_NAME}'`);
  } catch (err) {
    console.error(`❌ MongoDB error for sheet ${sheetName} (collection ${sheetName.toLowerCase()}):`, err);
    throw err; // Re-throw to be caught by the main loop's catch
  } finally {
    await client.close();
  }
}

(async () => {
  console.log(`Starting data ingestion from Google Sheet ID: ${SHEET_ID}`);
  console.log(`Target MongoDB: ${MONGO_URI}, Database: ${DB_NAME}`);
  console.log(`Processing sheets: ${SHEET_NAMES.join(', ')}`);

  let allSuccessful = true;
  for (const sheetName of SHEET_NAMES) {
    try {
      console.log(`\n--- Processing sheet: ${sheetName} ---`);
      const data = await fetchSheetCSV(sheetName);
      await insertToMongo(sheetName, data);
    } catch (err) {
      console.error(`❌❌ FATAL ERROR processing ${sheetName}: ${err.message}`);
      // console.error(err.stack); // Uncomment for more detailed stack trace
      allSuccessful = false;
    }
  }

  if (allSuccessful) {
    console.log("\n🎉 All sheets processed successfully!");
  } else {
    console.error("\n⚠️ Some sheets encountered errors during processing.");
    process.exitCode = 1; // Indicate an error exit for Docker
  }
})();
