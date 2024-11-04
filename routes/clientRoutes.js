const express = require('express'); // Import express
const router = express.Router(); // Create a router

// Sample in-memory data store for clients (replace with database logic if needed)
let clients = [];

// Get all clients
router.get('/', (req, res) => {
    res.json(clients); // Return the list of clients
});

// Add a new client
router.post('/', (req, res) => {
    const { name } = req.body; // Extract client name from request body
    if (!name) {
        return res.status(400).json({ message: 'Client name is required' }); // Send error if name is missing
    }
    const newClient = { id: clients.length + 1, name }; // Create a new client object
    clients.push(newClient); // Add the new client to the store
    res.status(201).json(newClient); // Respond with the created client
});

// Export the router for use in the main server file
module.exports = router;
