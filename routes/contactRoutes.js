const express = require('express'); // Import Express
const router = express.Router(); // Create a new router
const contactController = require('../controllers/contactController'); // Import contact controller

// Define routes for contact-related API endpoints
router.get('/', contactController.getContacts); // GET all contacts
router.post('/', contactController.createContact); // POST a new contact
router.delete('/:id', contactController.unlinkContact); // DELETE a contact by ID

// Export the router for use in the server
module.exports = router;
