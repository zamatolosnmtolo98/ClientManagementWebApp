const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser to parse JSON requests
const clientRoutes = require('./routes/clientRoutes'); // Import client routes
const contactRoutes = require('./routes/contactRoutes'); // Import contact routes

const app = express(); // Create an instance of express
const PORT = process.env.PORT || 5000; // Set port

app.use(bodyParser.json()); // Middleware to parse JSON requests

// Set up routes
app.use('/api/clients', clientRoutes); // Use client routes for client-related requests
app.use('/api/contacts', contactRoutes); // Use contact routes for contact-related requests

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
