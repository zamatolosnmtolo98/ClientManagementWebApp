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
        const client = { name, code }; // Create client object
        fetch('http://localhost:5000/api/clients', {
            method: 'POST', // Use POST method to add client
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client), // Convert client object to JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            clients.push(data); // Add client to local array
            renderClients(); // Update client table
            document.getElementById('clientNameInput').value = ''; // Clear input
            document.getElementById('clientCodeInput').value = ''; // Clear input
            populateClientSelector(); // Update the client selector for contacts
        })
        .catch(error => showMessage("Error adding client: " + error.message, "error")); // Error message
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
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.code}</td>
            <td class="center">${client.linkedContacts || 0}</td>
            <td><button onclick="deleteClient('${client._id}')">Delete</button></td>`; // Set inner HTML for row
        clientsTable.appendChild(row); // Append row to table
    });
}

// Function to delete a client
function deleteClient(clientId) {
    fetch(`http://localhost:5000/api/clients/${clientId}`, {
        method: 'DELETE', // Use DELETE method to remove client
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        clients = clients.filter(client => client._id !== clientId); // Filter out deleted client
        renderClients(); // Update client table
    })
    .catch(error => showMessage("Error deleting client: " + error.message, "error")); // Error message
}

// Function to add a contact
function addContact() {
    const fullName = document.getElementById('contactNameInput').value; // Get contact name
    const email = document.getElementById('contactEmailInput').value; // Get contact email
    const clientId = document.getElementById('clientSelector').value; // Get selected client

    if (fullName && email && clientId) {
        const contact = { fullName, email, clientId }; // Create contact object
        fetch('http://localhost:5000/api/contacts', {
            method: 'POST', // Use POST method to add contact
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact), // Convert contact object to JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            contacts.push(data); // Add contact to local array
            const client = clients.find(client => client._id === clientId);
            if (client) client.linkedContacts++; // Increment linked contacts count
            renderContacts(); // Update contact table
            renderClients(); // Update client table to reflect new contact
            document.getElementById('contactNameInput').value = ''; // Clear input
            document.getElementById('contactEmailInput').value = ''; // Clear input
        })
        .catch(error => showMessage("Error adding contact: " + error.message, "error")); // Error message
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
        row.innerHTML = `
            <td>${contact.fullName}</td>
            <td>${contact.email}</td>
            <td><button onclick="deleteContact('${contact._id}')">Delete</button></td>`; // Set inner HTML for row
        contactTable.appendChild(row); // Append row to table
    });
}

// Function to delete a contact
function deleteContact(contactId) {
    fetch(`http://localhost:5000/api/contacts/${contactId}`, {
        method: 'DELETE', // Use DELETE method to remove contact
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        contacts = contacts.filter(contact => contact._id !== contactId); // Filter out deleted contact
        const client = clients.find(client => client._id === contact.clientId);
        if (client) client.linkedContacts--; // Decrement linked contacts count
        renderContacts(); // Update contact table
        renderClients(); // Update client table to reflect deleted contact
    })
    .catch(error => showMessage("Error deleting contact: " + error.message, "error")); // Error message
}

// Function to populate client selector for contacts
function populateClientSelector() {
    const clientSelector = document.getElementById('clientSelector'); // Get client selector
    clientSelector.innerHTML = ''; // Clear options

    clients.forEach(client => {
        const option = document.createElement('option'); // Create option for each client
        option.value = client._id; // Set value to client ID
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

