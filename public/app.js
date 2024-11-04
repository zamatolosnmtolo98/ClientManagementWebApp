const apiUrl = 'http://localhost:3000/api'; // Base URL for API endpoints

// Function to open a tab in the UI
function openTab(tabName) {
    const tabcontent = document.getElementsByClassName('tabcontent'); // Get all tab contents
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'; // Hide all tab contents
    }
    document.getElementById(tabName).style.display = 'block'; // Show the selected tab
}

// Function to add a new client
async function addClient() {
    const clientName = document.getElementById('clientNameInput').value; // Get client name from input
    const response = await fetch(`${apiUrl}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: clientName }) // Send client name in request body
    });
    if (response.ok) {
        const newClient = await response.json(); // Get the newly created client from response
        displayClients(newClient); // Display the new client
        showMessage('Client added successfully'); // Show success message
        document.getElementById('clientNameInput').value = ''; // Clear input field
    } else {
        const error = await response.json(); // Get error details
        showMessage(`Failed to add client: ${error.message}`); // Show error message
    }
}

// Function to display a client in the clients table
function displayClients(client) {
    const table = document.getElementById('clientTable'); // Get the clients table
    const row = table.insertRow(); // Insert a new row in the table
    const cell1 = row.insertCell(0); // Insert a new cell for client name
    const cell2 = row.insertCell(1); // Insert a new cell for linked contacts
    cell1.innerHTML = client.name; // Set cell content to client name
    cell2.innerHTML = '0'; // Initialize linked contacts count to 0
}

// Function to add a new contact
async function addContact() {
    const fullName = document.getElementById('contactNameInput').value; // Get contact name from input
    const email = document.getElementById('contactEmailInput').value; // Get contact email from input
    const clientName = document.getElementById('clientSelector').value; // Get selected client name
    const response = await fetch(`${apiUrl}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, clientName }) // Send contact details in request body
    });
    if (response.ok) {
        const newContact = await response.json(); // Get the newly created contact from response
        displayContacts(newContact); // Display the new contact
        showMessage('Contact added successfully'); // Show success message
        document.getElementById('contactNameInput').value = ''; // Clear input field
        document.getElementById('contactEmailInput').value = ''; // Clear email field
    } else {
        const error = await response.json(); // Get error details
        showMessage(`Failed to add contact: ${error.message}`); // Show error message
    }
}

// Function to display a contact in the contacts table
function displayContacts(contact) {
    const table = document.getElementById('contactTable'); // Get the contacts table
    const row = table.insertRow(); // Insert a new row in the table
    row.setAttribute('data-id', contact.id); // Set data-id attribute for easy reference
    const cell1 = row.insertCell(0); // Insert a new cell for contact name
    const cell2 = row.insertCell(1); // Insert a new cell for contact email
    const cell3 = row.insertCell(2); // Insert a new cell for client name
    const cell4 = row.insertCell(3); // Insert a new cell for action
    cell1.innerHTML = contact.fullName; // Set cell content to contact name
    cell2.innerHTML = contact.email; // Set cell content to contact email
    cell3.innerHTML = contact.clientName; // Set cell content to client name
    cell4.innerHTML = `<button onclick="unlinkContact(${contact.id})">Unlink</button>`; // Button to unlink contact
}

// Function to unlink a contact
async function unlinkContact(id) {
    const response = await fetch(`${apiUrl}/contacts/${id}`, { method: 'DELETE' }); // Send DELETE request
    if (response.ok) {
        const row = document.querySelector(`#contactTable tr[data-id="${id}"]`); // Find the contact row in the table
        if (row) {
            row.remove(); // Remove the row from the table
        }
        showMessage('Contact unlinked successfully'); // Show success message
    } else {
        const error = await response.json(); // Get error details
        showMessage(`Failed to unlink contact: ${error.message}`); // Show error message
    }
}

// Function to show messages in the UI
function showMessage(message) {
    const messageDiv = document.getElementById('message'); // Get message div
    messageDiv.innerHTML = message; // Set message content
    setTimeout(() => {
        messageDiv.innerHTML = ''; // Clear message after a timeout
    }, 3000);
}

// Fetch initial data and populate tables when the page loads
window.onload = async () => {
    const clientResponse = await fetch(`${apiUrl}/clients`); // Fetch clients
    if (clientResponse.ok) {
        const clients = await clientResponse.json(); // Parse clients response
        clients.forEach(displayClients); // Display each client
    } else {
        showMessage('Failed to load clients'); // Show error message
    }

    const contactResponse = await fetch(`${apiUrl}/contacts`); // Fetch contacts
    if (contactResponse.ok) {
        const contacts = await contactResponse.json(); // Parse contacts response
        contacts.forEach(displayContacts); // Display each contact
    } else {
        showMessage('Failed to load contacts'); // Show error message
    }
};
