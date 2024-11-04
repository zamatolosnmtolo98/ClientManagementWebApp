const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000; // Change the port back to 3000

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

let clients = [];
let contacts = [];

// Route to get all clients
app.get('/api/clients', (req, res) => {
    res.json(clients);
});

// Route to add a client
app.post('/api/clients', (req, res) => {
    const { name, code } = req.body;
    const client = { id: clients.length + 1, name, code, contactCount: 0 }; // Add contactCount
    clients.push(client);
    res.status(201).json(client);
});

// Route to delete a client
app.delete('/api/clients/:id', (req, res) => {
    const { id } = req.params;
    clients = clients.filter(client => client.id !== parseInt(id));
    res.status(204).end();
});

// Route to get all contacts
app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});

// Route to add a contact
app.post('/api/contacts', (req, res) => {
    const { name, email, clientId } = req.body;
    const contact = { id: contacts.length + 1, name, email, clientId };
    contacts.push(contact);
    res.status(201).json(contact);
});

// Route to delete a contact
app.delete('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    contacts = contacts.filter(contact => contact.id !== parseInt(id));
    res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
