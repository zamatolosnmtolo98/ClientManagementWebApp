// Function to render the list of clients and populate the client selector dropdown
async function renderClients() {
    const clientTable = document.getElementById('clientTable'); // Get the table element for clients
    const clientSelector = document.getElementById('clientSelector'); // Get the dropdown element for selecting clients

    try {
        // Fetch the list of clients from the server
        const response = await fetch('/api/clients');
        const clients = await response.json(); // Parse the JSON response

        clientTable.innerHTML = ''; // Clear existing content in the client table
        clientSelector.innerHTML = ''; // Clear existing options in the client selector

        // Check if there are no clients
        if (clients.length === 0) {
            clientTable.innerHTML = '<tr><td colspan="2" class="center">No clients found</td></tr>'; // Display message if no clients
        } else {
            // Render the table header
            clientTable.innerHTML = '<tr><th>Client Name</th><th>Linked Contacts</th></tr>';
            clients.forEach(client => {
                // Create a row for each client with their name and linked contacts
                const row = `<tr><td>${client.name}</td><td>${client.linkedContacts}</td></tr>`;
                clientTable.innerHTML += row; // Append the row to the table

                // Create an option for the client selector dropdown
                const option = document.createElement('option');
                option.value = client.name; // Set the value to the client's name
                option.textContent = client.name; // Set the display text
                clientSelector.appendChild(option); // Add the option to the dropdown
            });
        }
    } catch (error) {
        console.error("Error loading clients:", error); // Log any errors encountered during the fetch
    }
}

// Function to render the list of contacts
async function renderContacts() {
    const contactTable = document.getElementById('contactTable'); // Get the table element for contacts

    try {
        // Fetch the list of contacts from the server
        const response = await fetch('/api/contacts');
        const contacts = await response.json(); // Parse the JSON response

        contactTable.innerHTML = ''; // Clear existing content in the contact table

        // Check if there are no contacts
        if (contacts.length === 0) {
            contactTable.innerHTML = '<tr><td colspan="4" class="center">No contacts found</td></tr>'; // Display message if no contacts
        } else {
            // Render the table header
            contactTable.innerHTML = '<tr><th>Contact Name</th><th>Email</th><th>Client Name</th><th>Action</th></tr>';
            contacts.forEach((contact, index) => {
                // Create a row for each contact with their details and an action button to unlink
                const row = `<tr><td>${contact.fullName}</td><td>${contact.email}</td><td>${contact.clientName}</td><td><button onclick="unlinkContact(${index})">Unlink</button></td></tr>`;
                contactTable.innerHTML += row; // Append the row to the table
            });
        }
    } catch (error) {
        console.error("Error loading contacts:", error); // Log any errors encountered during the fetch
    }
}

// Function to add a new client
async function addClient() {
    const name = document.getElementById('clientNameInput').value; // Get the value from the client name input
    if (!name) return alert("Client name is required"); // Alert if no name is provided

    // Send a POST request to add the new client
    await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }) // Send the client name as JSON
    });
    renderClients(); // Refresh the client list after adding
}

// Function to add a new contact
async function addContact() {
    const fullName = document.getElementById('contactNameInput').value; // Get the full name from input
    const email = document.getElementById('contactEmailInput').value; // Get the email from input
    const clientName = document.getElementById('clientSelector').value; // Get the selected client from dropdown
    if (!fullName || !email || !clientName) return alert("All fields are required"); // Alert if any field is empty

    // Send a POST request to add the new contact
    await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, clientName }) // Send the contact details as JSON
    });
    renderContacts(); // Refresh the contact list after adding
}

// Function to unlink a contact by its index
async function unlinkContact(index) {
    await fetch(`/api/contacts/${index}`, { method: 'DELETE' }); // Send a DELETE request for the contact
    renderContacts(); // Refresh the contact list after unlinking
}

// Function to open a specific tab in the UI
function openTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tabcontent').forEach(content => content.style.display = 'none');
    // Show the selected tab content
    document.getElementById(tabName).style.display = 'block';
}
