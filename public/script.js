let clients = []; // Array to hold clients
let contacts = []; // Array to hold contacts

// Function to open tabs
function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tabcontent');
    tabContents.forEach(tab => {
        tab.style.display = 'none'; // Hide all tabs
    });
    document.getElementById(tabName).style.display = 'block'; // Show selected tab
}

// Function to add a client
function addClient() {
    const name = document.getElementById('clientNameInput').value.trim(); // Get and trim client name
    const code = document.getElementById('clientCodeInput').value.trim(); // Get and trim client code

    if (name && code) {
        const client = { id: clients.length + 1, name, code }; // Create client object
        clients.push(client); // Add client to array
        renderClients(); // Update client table
        document.getElementById('clientNameInput').value = ''; // Clear input
        document.getElementById('clientCodeInput').value = ''; // Clear input
        populateClientSelector(); // Update client selector for contacts
        showMessage("Client added successfully!", "success"); // Success message
    } else {
        showMessage("Please enter both client name and code.", "error"); // Error message
    }
}

// Function to render clients
function renderClients() {
    const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0]; // Get tbody of clients table
    clientsTable.innerHTML = ''; // Clear table content

    clients.forEach(client => {
        const row = document.createElement('tr'); // Create new row for each client
        row.innerHTML = `<td>${client.name}</td><td>${client.code}</td><td><button onclick="deleteClient(${client.id})">Delete</button></td>`; // Set inner HTML for row
        clientsTable.appendChild(row); // Append row to table
    });
}

// Function to delete a client
function deleteClient(clientId) {
    clients = clients.filter(client => client.id !== clientId); // Filter out deleted client
    contacts = contacts.filter(contact => contact.clientId !== clientId); // Remove associated contacts
    renderClients(); // Update client table
    renderContacts(); // Update contact table
    showMessage("Client deleted successfully!", "success"); // Success message
}

// Function to add a contact
function addContact() {
    const name = document.getElementById('contactNameInput').value.trim(); // Get and trim contact name
    const email = document.getElementById('contactEmailInput').value.trim(); // Get and trim contact email
    const clientId = document.getElementById('clientSelector').value; // Get selected client

    if (name && email && clientId) {
        const contact = { id: contacts.length + 1, name, email, clientId }; // Create contact object
        contacts.push(contact); // Add contact to array
        renderContacts(); // Update contact table
        document.getElementById('contactNameInput').value = ''; // Clear input
        document.getElementById('contactEmailInput').value = ''; // Clear input
        showMessage("Contact added successfully!", "success"); // Success message
    } else {
        showMessage("Please enter contact name, email, and select a client.", "error"); // Error message
    }
}

// Function to render contacts
function renderContacts() {
    const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0]; // Get tbody of contacts table
    contactTable.innerHTML = ''; // Clear table content

    contacts.forEach(contact => {
        const client = clients.find(c => c.id === parseInt(contact.clientId)); // Find associated client
        const row = document.createElement('tr'); // Create new row for each contact
        row.innerHTML = `<td>${contact.name}</td><td>${contact.email}</td><td>${client ? client.name : 'N/A'}</td><td><button onclick="deleteContact(${contact.id})">Delete</button></td>`; // Set inner HTML for row
        contactTable.appendChild(row); // Append row to table
    });
}

// Function to delete a contact
function deleteContact(contactId) {
    contacts = contacts.filter(contact => contact.id !== contactId); // Filter out deleted contact
    renderContacts(); // Update contact table
    showMessage("Contact deleted successfully!", "success"); // Success message
}

// Function to show message
function showMessage(msg, type) {
    const messageDiv = document.getElementById('message'); // Get message div
    messageDiv.innerText = msg; // Set message text
    messageDiv.className = type; // Set class for styling
    messageDiv.style.display = 'block'; // Show message
    setTimeout(() => {
        messageDiv.innerText = ''; // Clear message after timeout
        messageDiv.style.display = 'none'; // Hide message
    }, 3000);
}

// Populate client selector for adding contacts
function populateClientSelector() {
    const clientSelector = document.getElementById('clientSelector'); // Get client selector
    clientSelector.innerHTML = '<option value="">Select a client</option>'; // Clear current options and add default

    clients.forEach(client => {
        const option = document.createElement('option'); // Create new option
        option.value = client.id; // Set value
        option.textContent = client.name; // Set display text
        clientSelector.appendChild(option); // Append option to selector
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    openTab('Clients'); // Open the Clients tab by default
});
