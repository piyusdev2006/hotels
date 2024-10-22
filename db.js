
// responnsible for connecting to the database

const mongoose = require("mongoose");

// Define the MongoDB connection url

const mongoURL = "mongodb://localhost:27017/hotels";

// set up MongoDB connection string

mongoose.connect(mongoURL,
        // {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        // }
);

// Get The default connections
// mongoose maintain a default connection object representing the mongoDb connection

const db = mongoose.connection;


db.on('connected', () => {     // define event listenert for databse connections
  console.log("MongoDB connected successfully");
});

db.on('disconnected', () => {
        console.log("MongoDB disconnected successfully");
});

db.on('error', (err) => {
        console.log("Database connection errror");
});



// Export the database connection

module.exports = db;