const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

let clients = []; // Array to hold clients
let contacts = []; // Array to hold contacts

// API to get all clients
app.get('/api/clients', (req, res) => {
    res.json(clients); // Return clients array
});

// API to add a new client
app.post('/api/clients', (req, res) => {
    const { name, code } = req.body; // Get client data from request
    const newClient = { id: clients.length + 1, name, code }; // Create new client object
    clients.push(newClient); // Add to clients array
    res.status(201).json(newClient); // Return created client
});

// API to delete a client
app.delete('/api/clients/:id', (req, res) => {
    const clientId = parseInt(req.params.id); // Get client ID from request
    clients = clients.filter(client => client.id !== clientId); // Remove client
    contacts = contacts.filter(contact => contact.clientId !== clientId); // Remove linked contacts
    res.sendStatus(204); // No content response
});

// API to get all contacts
app.get('/api/contacts', (req, res) => {
    res.json(contacts); // Return contacts array
});

// API to add a new contact
app.post('/api/contacts', (req, res) => {
    const { fullName, email, clientId } = req.body; // Get contact data from request
    const newContact = { id: contacts.length + 1, fullName, email, clientId }; // Create new contact object
    contacts.push(newContact); // Add to contacts array
    res.status(201).json(newContact); // Return created contact
});

// API to delete a contact
app.delete('/api/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id); // Get contact ID from request
    contacts = contacts.filter(contact => contact.id !== contactId); // Remove contact
    res.sendStatus(204); // No content response
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server start
});
