const express = require('express'); // Import express for server creation
const bodyParser = require('body-parser'); // Import body-parser to parse request bodies
const clientManagement = require('./app'); // Import the client management logic

const app = express(); // Create an express app
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

// Client Routes

// GET endpoint to retrieve all clients
app.get('/api/clients', (req, res) => {
    const clients = clientManagement.getAllClients(); // Get all clients
    if (clients.length === 0) {
        return res.status(404).json({ message: "No clients found." }); // Handle no clients found
    }
    res.json(clients); // Return clients in JSON format
});

// POST endpoint to add a new client
app.post('/api/clients', (req, res) => {
    const { name, clientCode } = req.body; // Destructure the request body
    const client = clientManagement.addClient(name, clientCode); // Add the client
    res.status(201).json(client); // Respond with the created client
});

// Contact Routes

// GET endpoint to retrieve all contacts
app.get('/api/contacts', (req, res) => {
    const contacts = clientManagement.getAllContacts(); // Get all contacts
    if (contacts.length === 0) {
        return res.status(404).json({ message: "No contacts found." }); // Handle no contacts found
    }
    res.json(contacts); // Return contacts in JSON format
});

// POST endpoint to add a new contact
app.post('/api/contacts', (req, res) => {
    const { fullName, email } = req.body; // Destructure the request body
    const contact = clientManagement.addContact(fullName, email); // Add the contact
    res.status(201).json(contact); // Respond with the created contact
});

// POST endpoint to link a contact to a client
app.post('/api/clients/:clientCode/contacts', (req, res) => {
    const { clientCode } = req.params; // Get client code from route parameters
    const { fullName, email } = req.body; // Destructure the request body
    const contact = clientManagement.addContact(fullName, email); // Add the contact
    clientManagement.linkContactToClient(clientCode, contact); // Link the contact to the client
    res.status(200).json(contact); // Respond with the linked contact
});

// DELETE endpoint to unlink a contact from a client
app.delete('/api/contacts/:clientCode/:fullName', (req, res) => {
    const { clientCode, fullName } = req.params; // Get parameters from route
    clientManagement.unlinkContact(clientCode, fullName); // Unlink the contact
    res.status(204).send(); // Respond with no content
});

// Start the server
const PORT = 3000; // Define the port to listen on
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); // Log server start
