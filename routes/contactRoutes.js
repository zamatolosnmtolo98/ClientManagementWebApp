const express = require('express'); // Import express
const router = express.Router(); // Create a router

// Sample in-memory data store for contacts (replace with database logic if needed)
let contacts = [];

// Get all contacts
router.get('/', (req, res) => {
    res.json(contacts); // Return the list of contacts
});

// Add a new contact
router.post('/', (req, res) => {
    const { fullName, email, clientName } = req.body; // Extract contact details from request body
    // Validation check for required fields
    if (!fullName || !email || !clientName) {
        return res.status(400).json({ message: 'Full name, email, and client name are required' }); // Send error if fields are missing
    }
    const newContact = { id: contacts.length + 1, fullName, email, clientName }; // Create a new contact object
    contacts.push(newContact); // Add the new contact to the store
    res.status(201).json(newContact); // Respond with the created contact
});

// Delete a contact
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Get contact ID from request params
    const initialLength = contacts.length; // Store initial length of contacts array
    contacts = contacts.filter(contact => contact.id !== id); // Remove contact from the store
    // Check if a contact was deleted
    if (contacts.length < initialLength) {
        return res.status(204).send(); // Respond with no content status if deletion was successful
    } else {
        return res.status(404).json({ message: 'Contact not found' }); // Send error if no contact was found to delete
    }
});

// Export the router for use in the main server file
module.exports = router;
