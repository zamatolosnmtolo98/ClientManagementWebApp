const Contact = require('../models/contactModel');

exports.getAllContacts = (req, res) => {
    const contacts = Contact.getAll();
    res.json(contacts);
};

exports.addContact = (req, res) => {
    const { fullName, email, clientName } = req.body;
    if (!fullName || !email || !clientName) {
        return res.status(400).json({ error: 'All contact fields are required' });
    }

    const newContact = Contact.addContact(fullName, email, clientName);
    res.json(newContact);
};

exports.unlinkContact = (req, res) => {
    const { index } = req.params;
    Contact.unlinkContact(Number(index));
    res.status(204).end();
};
