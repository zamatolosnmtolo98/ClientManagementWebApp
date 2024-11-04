const express = require('express');
const router = express.Router();

// Sample in-memory data store (replace with database logic)
let clients = [];

// Get all clients
router.get('/', (req, res) => {
    res.json(clients); // Return the list of clients
});

// Add a new client
router.post('/', (req, res) => {
    const { name } = req.body; // Extract client name from request body
    if (!name) {
        return res.status(400).send('Client name is required'); // Validation check
    }
    const newClient = { id: clients.length + 1, name }; // Create a new client object
    clients.push(newClient); // Add the new client to the store
    res.status(201).json(newClient); // Respond with the created client
});

module.exports = router; // Export the router
