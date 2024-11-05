const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique IDs

const router = express.Router();
let clients = []; // Initialize an empty array to store clients

// GET route to return the list of clients
router.get('/', (req, res) => {
    res.status(200).json(clients); // Respond with the list of clients
});

// POST route to add a new client
router.post('/', (req, res) => {
    const { name, code } = req.body; // Extract client details from request body
    if (!name || !code) {
        return res.status(400).json({ message: 'Name and code are required' }); // Validation check
    }
    const newClient = { id: uuidv4(), name, code, linkedContacts: 0 }; // Create a new client object with a unique ID
    clients.push(newClient); // Add the new client to the store
    res.status(201).json(newClient); // Respond with the created client
});

// DELETE route to delete a client by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id; // Get client ID from request params
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
