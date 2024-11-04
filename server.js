const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data storage
let clients = [];
let contacts = [];

// Client class
class Client {
    constructor(name) {
        this.name = name;
        this.linkedContacts = 0;
        this.code = this.generateClientCode();
    }

    generateClientCode() {
        const prefix = this.name.substring(0, 3).toUpperCase();
        const suffix = String(clients.filter(c => c.code.startsWith(prefix)).length + 1).padStart(3, '0');
        return `${prefix}${suffix}`;
    }
}

// Contact class
class Contact {
    constructor(fullName, email, clientName) {
        this.fullName = fullName;
        this.email = email;
        this.clientName = clientName;
    }
}

// Client routes
app.post('/api/clients', (req, res) => {
    const { name } = req.body;
    const client = new Client(name);
    clients.push(client);
    res.status(201).json(client);
});

app.get('/api/clients', (req, res) => {
    res.json(clients);
});

// Contact routes
app.post('/api/contacts', (req, res) => {
    const { fullName, email, clientName } = req.body;
    const contact = new Contact(fullName, email, clientName);
    contacts.push(contact);

    // Increment linked contacts count in the client
    const client = clients.find(c => c.name === clientName);
    if (client) {
        client.linkedContacts++;
    }
    res.status(201).json(contact);
});

app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
