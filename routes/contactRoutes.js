const express = require('express');
const router = express.Router();

// Sample in-memory data store (replace with database logic)
let contacts = [];

// Get all contacts
router.get('/', (req, res) => {
    res.json(contacts); // Return the list of contacts
});

// Add a new contact
router.post('/', (req, res) => {
    const { fullName, email, clientName } = req.body; // Extract contact details from request body
    if (!fullName || !email || !clientName) {
        return res.status(400).send('Full name, email, and client name are required'); // Validation check
    }
    const newContact = { 
        id: contacts.length + 1, 
        fullName, 
        email, 
        clientName 
    }; // Create a new contact object
    contacts.push(newContact); // Add the new contact to the store
    res.status(201).json(newContact); // Respond with the created contact
});

// Delete a contact
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Get contact ID from request params
    contacts = contacts.filter(contact => contact.id !== id); // Remove contact from the store
    res.status(204).send(); // Respond with no content status
});

module.exports = router; // Export the router
