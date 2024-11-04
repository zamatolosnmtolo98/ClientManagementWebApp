const express = require('express'); // Import express
const router = express.Router(); // Create a router
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique ID generation

// Sample in-memory data store for clients (replace with database logic if needed)
let clients = [];

// Get all clients
router.get('/', (req, res) => {
    res.json(clients); // Return the list of clients
});
const express = require('express'); // Import express
const router = express.Router(); // Create a router

let clients = []; // Sample in-memory data store for clients

// Get all clients
router.get('/', (req, res) => {
    res.json(clients); // Return the list of clients
});

// Add a new client
router.post('/', (req, res) => {
    const { name, code } = req.body; // Extract client details from request body
    if (!name || !code) {
        return res.status(400).json({ message: 'Name and code are required' }); // Validation check
    }
    const newClient = { id: clients.length + 1, name, code, linkedContacts: 0 }; // Create a new client object
    clients.push(newClient); // Add the new client to the store
    res.status(201).json(newClient); // Respond with the created client
});

// Delete a client
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Get client ID from request params
    const initialLength = clients.length; // Store initial length of clients array
    clients = clients.filter(client => client.id !== id); // Remove client from the store
    if (clients.length < initialLength) {
        return res.status(204).send(); // Respond with no content status if deletion was successful
    } else {
        return res.status(404).json({ message: 'Client not found' }); // Send error if no client was found to delete
    }
});

// Export the router for use in the main server file
module.exports = router;
