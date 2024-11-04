const Client = require('../models/clientModel');

exports.getAllClients = (req, res) => {
    const clients = Client.getAll();
    res.json(clients);
};

exports.addClient = (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Client name is required' });

    const newClient = Client.addClient(name);
    res.json(newClient);
};
