// Class representing a client
class Client {
    constructor(name, clientCode) {
        this.name = name; // Name of the client
        this.clientCode = clientCode; // Unique client code
        this.linkedContacts = []; // Array to store linked contacts
    }
}

// Class representing a contact
class Contact {
    constructor(fullName, email) {
        this.fullName = fullName; // Full name of the contact
        this.email = email; // Email address of the contact
    }
}

// Class to manage clients and contacts
class ClientManagement {
    constructor() {
        this.clients = []; // Array to store clients
        this.contacts = []; // Array to store contacts
    }

    // Method to add a new client
    addClient(name, clientCode) {
        const newClient = new Client(name, clientCode);
        this.clients.push(newClient); // Add new client to the array
        return newClient; // Return the newly created client
    }

    // Method to add a new contact
    addContact(fullName, email) {
        const newContact = new Contact(fullName, email);
        this.contacts.push(newContact); // Add new contact to the array
        return newContact; // Return the newly created contact
    }

    // Method to link a contact to a client
    linkContactToClient(clientCode, contact) {
        const client = this.clients.find(c => c.clientCode === clientCode); // Find the client by client code
        if (client) {
            client.linkedContacts.push(contact); // Link the contact to the client
        }
    }

    // Method to get all clients sorted by name
    getAllClients() {
        return this.clients.sort((a, b) => a.name.localeCompare(b.name)); // Return sorted clients
    }

    // Method to get all contacts sorted by full name
    getAllContacts() {
        return this.contacts.sort((a, b) => a.fullName.localeCompare(b.fullName)); // Return sorted contacts
    }

    // Method to unlink a contact from a client
    unlinkContact(clientCode, contactFullName) {
        const client = this.clients.find(c => c.clientCode === clientCode); // Find the client by client code
        if (client) {
            // Filter out the contact that matches the full name
            client.linkedContacts = client.linkedContacts.filter(contact => contact.fullName !== contactFullName);
        }
    }
}

// Create an instance of the ClientManagement class
const clientManagement = new ClientManagement();

// Export the client management instance for use in the server
module.exports = clientManagement;
