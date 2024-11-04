// Contact model representing a contact
class Contact {
    constructor(id, fullName, email, clientName) {
        this.id = id; // Unique identifier for the contact
        this.fullName = fullName; // Full name of the contact
        this.email = email; // Email address of the contact
        this.clientName = clientName; // Associated client name
    }
}

// In-memory array to store contacts
const contacts = [];

// Function to get all contacts
function getAllContacts() {
    return contacts; // Return the array of contacts
}

// Function to add a new contact
function addContact(fullName, email, clientName) {
    const newContact = new Contact(contacts.length + 1, fullName, email, clientName); // Create a new contact with a unique ID
    contacts.push(newContact); // Add the new contact to the array
    return newContact; // Return the newly created contact
}

// Function to delete a contact by ID
function deleteContact(id) {
    const index = contacts.findIndex(contact => contact.id === parseInt(id)); // Find index of contact to delete
    if (index !== -1) {
        contacts.splice(index, 1); // Remove the contact from the array
        return true; // Return true if contact was found and deleted
    }
    return false; // Return false if contact was not found
}

// Export functions for use in controllers
module.exports = {
    getAllContacts,
    addContact,
    deleteContact
};
