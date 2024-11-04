const express = require('express');
const bodyParser = require('body-parser');
const clientController = require('./controllers/clientController');
const contactController = require('./controllers/contactController');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Client Routes
app.get('/api/clients', clientController.getAllClients);
app.post('/api/clients', clientController.addClient);

// Contact Routes
app.get('/api/contacts', contactController.getAllContacts);
app.post('/api/contacts', contactController.addContact);
app.delete('/api/contacts/:index', contactController.unlinkContact);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
