// Import required modules
const express = require('express'); // Web framework for Node.js
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling CORS
const clientRoutes = require('./routes/clientRoutes'); // Import client routes
const contactRoutes = require('./routes/contactRoutes'); // Import contact routes
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express application
const app = express();

// Use middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Serve static files from the public directory
app.use(express.static('public'));

// Set up API routes
app.use('/api/clients', clientRoutes); // Client-related routes
app.use('/api/contacts', contactRoutes); // Contact-related routes

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Log the request method and URL
    next(); // Pass control to the next middleware
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Something went wrong!'); // Respond with a generic error message
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000; // Use environment variable for port if available
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server start
});
