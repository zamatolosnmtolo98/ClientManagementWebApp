const express = require('express'); // Import Express
const router = express.Router(); // Create a new router
const clientController = require('../controllers/clientController'); // Import client controller

// Define routes for client-related API endpoints
router.get('/', clientController.getClients); // GET all clients
router.post('/', clientController.createClient); // POST a new client

// Export the router for use in the server
module.exports = router;
