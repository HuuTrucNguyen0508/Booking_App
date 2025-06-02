// gsheet-to-mongo/server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
// MONGO_URI from .env should include the database name for Mongoose
// e.g., MONGO_URI="mongodb://mongo:27017/gsheet_mirror" (for Docker)
// or MONGO_URI="mongodb://localhost:27017/gsheet_mirror" (for local dev)
const mongoUri = process.env.MONGO_URI;
const dbNameFromUri = mongoUri ? new URL(mongoUri).pathname.substring(1) : null; // Extracts DB name if present in URI
const dbNameToConnect = dbNameFromUri || process.env.DB_NAME || 'gsheet_mirror';

if (!mongoUri) {
  console.error('CRITICAL ERROR: MONGO_URI is not defined in environment variables.');
  process.exit(1);
}

// Construct the final URI for Mongoose if DB name wasn't in the original MONGO_URI
let finalMongoUri = mongoUri;
if (!dbNameFromUri && dbNameToConnect) {
    const separator = mongoUri.includes('?') ? '' : '/'; // Avoid "///" if URI has query params
    finalMongoUri = `${mongoUri.replace(/\/$/, '')}${separator}${dbNameToConnect}${mongoUri.includes('?') ? '' : ''}`;
    if (mongoUri.includes('?')) { // If there are options, append DB name before them
        const parts = mongoUri.split('?');
        finalMongoUri = `${parts[0].replace(/\/$/, '')}/${dbNameToConnect}?${parts[1]}`;
    }
}
console.log(`API Server attempting to connect to MongoDB: ${finalMongoUri}`);


mongoose.connect(finalMongoUri)
  .then(() => console.log(`MongoDB connected successfully for API server to database: ${mongoose.connection.name}!`))
  .catch(err => {
    console.error('MongoDB connection error for API server:', err);
    process.exit(1);
  });

// --- Generic Mongoose Schema for flexibility ---
const flexibleSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

// --- Helper to get or create model
// Mongoose caches models, so this prevents "OverwriteModelError"
const getModel = (collectionName) => {
  const sanitizedCollectionName = collectionName.toLowerCase().replace(/ /g, '_');
  if (mongoose.models[sanitizedCollectionName]) {
    return mongoose.models[sanitizedCollectionName];
  }
  return mongoose.model(sanitizedCollectionName, flexibleSchema, sanitizedCollectionName);
};

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('API Server is running. Access /api/collections to see available collections, or /api/collections/:collectionName/data for sheet data.');
});

// Route to list available collections (based on what's expected from SHEET_NAMES)
app.get('/api/collections', (req, res) => {
  const sheetNamesStr = process.env.SHEET_NAMES || 'Owner,Property,Bookings,User';
  const expectedCollections = sheetNamesStr.split(',').map(name => name.trim().toLowerCase().replace(/ /g, '_'));
  res.json({
    message: "Expected collections based on SHEET_NAMES environment variable. Data ingestion status may vary.",
    collections: expectedCollections
  });
});

// Dynamic route to fetch data from a specific collection
app.get('/api/collections/:collectionName/data', async (req, res) => {
  const { collectionName } = req.params;
  if (!collectionName) {
    return res.status(400).json({ message: 'Collection name is required.' });
  }

  try {
    const Model = getModel(collectionName); // Get or create model for the requested collection
    const data = await Model.find({});
    if (data.length === 0) {
        // Check if the collection actually exists to differentiate between empty and non-existent
        const collections = await mongoose.connection.db.listCollections({ name: collectionName.toLowerCase().replace(/ /g, '_') }).toArray();
        if (collections.length === 0) {
            return res.status(404).json({ message: `Collection '${collectionName}' not found or data not yet ingested.` });
        }
    }
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data from MongoDB collection '${collectionName}':`, error);
    res.status(500).json({ message: 'Error fetching data from database', error: error.message });
  }
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
