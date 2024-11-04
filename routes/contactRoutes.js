const express = require('express'); // Import express
const router = express.Router(); // Create a router
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique ID generation

let contacts = []; // Sample in-memory data store for contacts

// Get all contacts
router.get('/', (req, res) => {
    res.json(contacts); // Return the list of contacts
});

// Add a new contact
router.post('/', (req, res) => {
    const { fullName, email, clientId } = req.body; // Extract contact details from request body
    if (!fullName || !email || !clientId) {
        return res.status(400).json({ message: 'Full name, email, and client ID are required' }); // Validation check
    }
    const newContact = { id: uuidv4(), fullName, email, clientId }; // Create a new contact object with a unique ID
    contacts.push(newContact); // Add the new contact to the store
    res.status(201).json(newContact); // Respond with the created contact
});

// Delete a contact
router.delete('/:id', (req, res) => {
    const id = req.params.id; // Get contact ID from request params
    const initialLength = contacts.length; // Store initial length of contacts array
    contacts = contacts.filter(contact => contact.id !== id); // Remove contact from the store
    if (contacts.length < initialLength) {
        return res.status(204).send(); // Respond with no content status if deletion was successful
    } else {
        return res.status(404).json({ message: 'Contact not found' }); // Send error if no contact was found to delete
    }
});

// Export the router for use in the main server file
module.exports = router;
