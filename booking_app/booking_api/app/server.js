const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const client = new MongoClient('mongodb://mongodb:27017/');

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.send({ message: "Booking API is running" });
});

app.post('/bookings', async (req, res) => {
    await client.connect();
    const db = client.db('booking_db');
    const bookingsCollection = db.collection('bookings');
    const result = await bookingsCollection.insertOne(req.body);
    res.send({ id: result.insertedId });
});

app.get('/bookings/:booking_id', async (req, res) => {
    await client.connect();
    const db = client.db('booking_db');
    const bookingsCollection = db.collection('bookings');

    let objectId;
    try {
        objectId = new ObjectId(req.params.booking_id);
    } catch (error) {
        return res.status(400).send({ error: "Invalid booking ID format" });
    }

    const booking = await bookingsCollection.findOne({ _id: objectId });
    if (!booking) {
        res.status(404).send({ error: "Booking not found" });
    } else {
        res.send(booking);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

