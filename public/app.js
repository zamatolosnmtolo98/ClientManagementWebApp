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
        const client = { id: clients.length + 1, name, code, linkedContacts: 0 }; // Create client object
        clients.push(client); // Add client to array
        renderClients(); // Update client table
        document.getElementById('clientNameInput').value = ''; // Clear input
        document.getElementById('clientCodeInput').value = ''; // Clear input
        populateClientSelector(); // Update the client selector for contacts
    } else {
        showMessage("Please enter both client name and code.", "error"); // Error message
    }
}

// Function to render clients
function renderClients() {
    const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0]; // Get tbody of clients table
    clientsTable.innerHTML = ''; // Clear table content

    clients.sort((a, b) => a.name.localeCompare(b.name)); // Sort clients by name

    clients.forEach(client => {
        const row = document.createElement('tr'); // Create new row for each client
        row.innerHTML = `<td>${client.name}</td><td>${client.code}</td><td class="center">${client.linkedContacts}</td><td><button onclick="deleteClient(${client.id})">Delete</button></td>`; // Set inner HTML for row
        clientsTable.appendChild(row); // Append row to table
    });
}

// Function to delete a client
function deleteClient(clientId) {
    clients = clients.filter(client => client.id !== clientId); // Filter out deleted client
    renderClients(); // Update client table
}

// Function to add a contact
function addContact() {
    const fullName = document.getElementById('contactNameInput').value; // Get contact name
    const email = document.getElementById('contactEmailInput').value; // Get contact email
    const clientId = document.getElementById('clientSelector').value; // Get selected client

    if (fullName && email && clientId) {
        const contact = { id: contacts.length + 1, fullName, email, clientId }; // Create contact object
        contacts.push(contact); // Add contact to array
        clients.find(client => client.id == clientId).linkedContacts++; // Increment linked contacts count
        renderContacts(); // Update contact table
        renderClients(); // Update client table to reflect new contact
        document.getElementById('contactNameInput').value = ''; // Clear input
        document.getElementById('contactEmailInput').value = ''; // Clear input
    } else {
        showMessage("Please enter contact name, email, and select a client.", "error"); // Error message
    }
}

// Function to render contacts
function renderContacts() {
    const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0]; // Get tbody of contact table
    contactTable.innerHTML = ''; // Clear table content

    contacts.sort((a, b) => a.fullName.localeCompare(b.fullName)); // Sort contacts by name

    contacts.forEach(contact => {
        const row = document.createElement('tr'); // Create new row for each contact
        row.innerHTML = `<td>${contact.fullName}</td><td>${contact.email}</td><td><button onclick="deleteContact(${contact.id})">Delete</button></td>`; // Set inner HTML for row
        contactTable.appendChild(row); // Append row to table
    });
}

// Function to delete a contact
function deleteContact(contactId) {
    const contact = contacts.find(contact => contact.id === contactId); // Find contact by ID
    contacts = contacts.filter(contact => contact.id !== contactId); // Filter out deleted contact
    clients.find(client => client.id == contact.clientId).linkedContacts--; // Decrement linked contacts count
    renderContacts(); // Update contact table
    renderClients(); // Update client table to reflect deleted contact
}

// Function to populate client selector for contacts
function populateClientSelector() {
    const clientSelector = document.getElementById('clientSelector'); // Get client selector
    clientSelector.innerHTML = ''; // Clear options

    clients.forEach(client => {
        const option = document.createElement('option'); // Create option for each client
        option.value = client.id; // Set value to client ID
        option.textContent = client.name; // Set text to client name
        clientSelector.appendChild(option); // Append option to selector
    });
}

// Function to show messages
function showMessage(message, type) {
    const messageDiv = document.getElementById('message'); // Get message div
    messageDiv.innerHTML = `<div class="${type}">${message}</div>`; // Set message content
    setTimeout(() => {
        messageDiv.innerHTML = ''; // Clear message after 3 seconds
    }, 3000);
}

// Fetch clients from the server
function fetchClients() {
    fetch('http://localhost:5000/api/clients') // Fetch clients from server
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok'); // Throw error if response is not OK
            }
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            clients = data; // Store fetched clients
            renderClients(); // Render clients
            populateClientSelector(); // Populate client selector for contacts
        })
        .catch(error => {
            console.error('Error fetching clients:', error); // Log error
            showMessage("Error fetching clients: " + error.message, "error"); // Show error message
        });
}

// Call fetchClients on page load
window.onload = fetchClients; // Fetch clients when the page loads
