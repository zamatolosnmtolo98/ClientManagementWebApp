const express = require("express"); // Import express
const bodyParser = require("body-parser"); // Import body-parser to parse JSON requests
const mongoose = require("mongoose"); // Import mongoose to connect to MongoDB
const clientRoutes = require("./routes/clientRoutes"); // Import client routes
const contactRoutes = require("./routes/contactRoutes"); // Import contact routes

const app = express(); // Create an instance of express
const PORT = 3000; // Set port to 3000

// MongoDB connection setup
const uri = 'mongodb://localhost:27017/CMSApp';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
});

// Middleware to parse JSON requests
app.use(bodyParser.json()); 

// Set up routes
app.use("/api/clients", clientRoutes); // Use client routes for client-related requests
app.use("/api/contacts", contactRoutes); // Use contact routes for contact-related requests

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});