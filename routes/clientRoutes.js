const express = require('express');
const router = express.Router();

// Sample in-memory data store (replace with database logic)
let clients = [];

// Get all clients
router.get('/', (req, res) => {
    // Return the list of clients without the auto-generated code
    const clientsResponse = clients.map(({ id, name }) => ({ id, name }));
    res.json(clientsResponse);
});

// Add a new client
router.post('/', (req, res) => {
    const { name } = req.body; // Extract client name from request body
    if (!name) {
        return res.status(400).send('Client name is required'); // Validation check
    }
    const newClient = { 
        id: clients.length + 1, 
        name, 
        code: `C${clients.length + 1}` // Auto-generated client code
    }; 
    clients.push(newClient); // Add the new client to the store
    res.status(201).json(newClient); // Respond with the created client
});

module.exports = router; // Export the router
