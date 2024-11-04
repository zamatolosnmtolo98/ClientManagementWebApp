const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample data (this would typically come from a database)
let clients = [
    { id: 1, name: 'Client A', email: 'clienta@example.com' },
    { id: 2, name: 'Client B', email: 'clientb@example.com' }
];

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Client Management App!');
});

// Get all clients
app.get('/clients', (req, res) => {
    res.json(clients);
});

// Add a new client
app.post('/clients', (req, res) => {
    const newClient = { id: clients.length + 1, ...req.body };
    clients.push(newClient);
    res.status(201).json(newClient);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
