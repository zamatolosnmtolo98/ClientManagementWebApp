const express = require('express'); // Import express
const router = express.Router(); // Create a router
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique ID generation

// Sample in-memory data store for contacts (replace with database logic if needed)
let contacts = [];

// Get all contacts
router.get('/', (req, res) => {
    res.json(contacts); // Return the list of contacts
});

// Add a new contact
router.post('/', (req, res) => {
    const { fullName, email, clientId } = req.body; // Extract contact details from request body
    // Validation check for required fields
    if (!fullName || !email || !clientId) {
        return res.status(400).json({ message: 'Full name, email, and client ID are required' }); // Send error if fields are missing
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' }); // Send error if email is invalid
    }

    // Check for duplicate contacts
    if (contacts.some(contact => contact.email === email)) {
        return res.status(409).json({ message: 'Contact with this email already exists' }); // Error for duplicate email
    }

    const newContact = { id: uuidv4(), fullName, email, clientId }; // Create a new contact object with a unique ID
    contacts.push(newContact); // Add the new contact to the store
    res.status(201).json({ message: 'Contact created successfully', contact: newContact }); // Respond with success message and created contact
});

// Delete a contact
router.delete('/:id', (req, res) => {
    const id = req.params.id; // Get contact ID from request params
    const initialLength = contacts.length; // Store initial length of contacts array
    contacts = contacts.filter(contact => contact.id !== id); // Remove contact from the store
    // Check if a contact was deleted