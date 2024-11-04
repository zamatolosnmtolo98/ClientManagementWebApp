const contactModel = require('../models/contactModel'); // Import contact model

// Function to handle GET requests for contacts
function getContacts(req, res) {
    const contacts = contactModel.getAllContacts(); // Get all contacts
    res.json(contacts); // Send contacts as JSON response
}

// Function to handle POST requests to create a new contact
function createContact(req, res) {
    const { fullName, email, clientName } = req.body; // Destructure fields from request body
    if (!fullName || !email || !clientName) {
        return res.status(400).json({ message: 'All fields are required' }); // Send error if any field is missing
    }
    const newContact = contactModel.addContact(fullName, email, clientName); // Add new contact
    res.status(201).json(newContact); // Send newly created contact as JSON response
}

// Function to handle DELETE requests to unlink a contact
function unlinkContact(req, res) {
    const { id } = req.params; // Get contact ID from URL parameters
    const deleted = contactModel.deleteContact(id); // Attempt to delete contact
    if (deleted) {
        res.status(204).send(); // Send no content response if deleted
    } else {
        res.status(404).json({ message: 'Contact not found' }); // Send error if contact was not found
    }
}

// Export controller functions for use in routes
module.exports = {
    getContacts,
    createContact,
    unlinkContact
};
