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
    const name = document.getElementById('clientNameInput').value; // Get client name
    const code = document.getElementById('clientCodeInput').value; // Get client code

    if (name && code) {
        const client = { id: clients.length + 1, name, code }; // Create client object
        clients.push(client); // Add client to array
        renderClients(); // Update client table
        populateClientSelector(); // Update client selector for contacts
        document.getElementById('clientNameInput').value = ''; // Clear input
        document.getElementById('clientCodeInput').value = ''; // Clear input
    } else {
        showMessage("Please enter both client name and code.", "error"); // Error message
    }
}

// Function to render clients
function renderClients() {
    const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0]; // Get tbody of clients table
    clientsTable.innerHTML = ''; // Clear table content

    clients.forEach(client => {
        const linkedContacts = contacts.filter(contact => contact.clientId == client.id).length; // Count linked contacts
        const row = document.createElement('tr'); // Create new row for each client
        row.innerHTML = `<td>${client.name}</td><td>${client.code}</td><td style="text-align: center;">${linkedContacts}</td>
                         <td><button onclick="deleteClient(${client.id})">Delete</button></td>`; // Set inner HTML for row
        clientsTable.appendChild(row); // Append row to table
    });
}

// Function to delete a client
function deleteClient(clientId) {
    clients = clients.filter(client => client.id !== clientId); // Filter out deleted client
    contacts = contacts.filter(contact => contact.clientId !== clientId); // Remove linked contacts
    renderClients(); // Update client table
    populateClientSelector(); // Update client selector
}

// Function to add a contact
function addContact() {
    const fullName = document.getElementById('contactNameInput').value; // Get contact name
    const email = document.getElementById('contactEmailInput').value; // Get contact email
    const clientId = document.getElementById('clientSelector').value; // Get selected client

    if (fullName && email && clientId) {
        const contact = { id: contacts.length + 1, fullName, email, clientId }; // Create contact object
        contacts.push(contact); // Add contact to array
        renderContacts(); // Update contact table
        document.getElementById('contactNameInput').value = ''; // Clear input
        document.getElementById('contactEmailInput').value = ''; // Clear input
    } else {
        showMessage("Please fill in all fields.", "error"); // Error message
    }
}

// Function to render contacts
function renderContacts() {
    const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0]; // Get tbody of contacts table
    contactTable.innerHTML = ''; // Clear table content

    contacts.forEach(contact => {
        const row = document.createElement('tr'); // Create new row for each contact
        row.innerHTML = `<td>${contact.fullName}</td><td>${contact.email}</td>
                         <td><button onclick="deleteContact(${contact.id})">Delete</button></td>`; // Set inner HTML for row
        contactTable.appendChild(row); // Append row to table
    });
}

// Function to delete a contact
function deleteContact(contactId) {
    contacts = contacts.filter(contact => contact.id !== contactId); // Filter out deleted contact
    renderContacts(); // Update contact table
}

// Function to populate client selector for adding contacts
function populateClientSelector() {
    const clientSelector = document.getElementById('clientSelector'); // Get client selector
    clientSelector.innerHTML = '<option value="">Select Client</option>'; // Clear and reset options

    clients.forEach(client => {
        const option = document.createElement('option'); // Create new option for each client
        option.value = client.id; // Set value
        option.textContent = `${client.name} (Code: ${client.code})`; // Set text content
        clientSelector.appendChild(option); // Append option to selector
    });
}

// Function to show messages
function showMessage(message, type) {
    const messageDiv = document.getElementById('message'); // Get message display div
    messageDiv.textContent = message; // Set message text
    messageDiv.className = type; // Set class for styling
}
``