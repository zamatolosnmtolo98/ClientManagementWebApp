// app.js

// Client and Contact classes to manage the data
class Client {
    constructor(name) {
        this.name = name;
    }
}

class Contact {
    constructor(name) {
        this.name = name;
    }
}

// Client Controller to handle client operations
class ClientController {
    constructor() {
        this.clients = [];
    }

    addClient(name) {
        const client = new Client(name);
        this.clients.push(client);
        return this.clients;
    }

    getAllClients() {
        return this.clients;
    }
}

// Contact Controller to handle contact operations
class ContactController {
    constructor() {
        this.contacts = [];
    }

    addContact(name) {
        const contact = new Contact(name);
        this.contacts.push(contact);
        return this.contacts;
    }

    getAllContacts() {
        return this.contacts;
    }

    unlinkContact(index) {
        if (index > -1 && index < this.contacts.length) {
            this.contacts.splice(index, 1);
            return this.contacts;
        }
        return null; // Return null if the index is out of bounds
    }
}

// Initialize Controllers
const clientController = new ClientController();
const contactController = new ContactController();

// DOM Elements
const clientForm = document.getElementById('clientForm');
const contactForm = document.getElementById('contactForm');
const clientList = document.getElementById('clientList');
const contactList = document.getElementById('contactList');

// Update Client List
function updateClientList() {
    clientList.innerHTML = '';
    const clients = clientController.getAllClients();
    if (clients.length === 0) {
        clientList.innerHTML = '<p>No clients found.</p>';
    } else {
        clients.forEach((client, index) => {
            clientList.innerHTML += `<p>${client.name} <button onclick="unlinkClient(${index})">Remove</button></p>`;
        });
    }
}

// Update Contact List
function updateContactList() {
    contactList.innerHTML = '';
    const contacts = contactController.getAllContacts();
    if (contacts.length === 0) {
        contactList.innerHTML = '<p>No contacts found.</p>';
    } else {
        contacts.forEach((contact, index) => {
            contactList.innerHTML += `<p>${contact.name} <button onclick="unlinkContact(${index})">Remove</button></p>`;
        });
    }
}

// Handle Client Form Submission
clientForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const clientName = document.getElementById('clientName').value;
    if (clientName) {
        clientController.addClient(clientName);
        updateClientList();
        clientForm.reset();
    }
});

// Handle Contact Form Submission
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const contactName = document.getElementById('contactName').value;
    if (contactName) {
        contactController.addContact(contactName);
        updateContactList();
        contactForm.reset();
    }
});

// Unlink Client
function unlinkClient(index) {
    clientController.clients.splice(index, 1);
    updateClientList();
}

// Unlink Contact
function unlinkContact(index) {
    contactController.unlinkContact(index);
    updateContactList();
}

// Initial load
updateClientList();
updateContactList();
