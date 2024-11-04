const clientModel = require('../models/clientModel'); // Import client model

// Function to handle GET requests for clients
function getClients(req, res) {
    const clients = clientModel.getAllClients(); // Get all clients
    res.json(clients); // Send clients as JSON response
}

// Function to handle POST requests to create a new client
function createClient(req, res) {
    const { name } = req.body; // Destructure name from request body
    if (!name) {
        return res.status(400).json({ message: 'Client name is required' }); // Send error if name is missing
    }
    const newClient = clientModel.addClient(name); // Add new client
    res.status(201).json(newClient); // Send newly created client as JSON response
}

// Export controller functions for use in routes
module.exports = {
    getClients,
    createClient
};
