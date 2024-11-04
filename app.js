// Initial Rendering of Clients and Contacts
document.addEventListener('DOMContentLoaded', () => {
    renderClients();
    renderContacts();
});

// Render Client List with Error Handling
async function renderClients() {
    const clientTable = document.getElementById('clientTable');
    const clientSelector = document.getElementById('clientSelector');

    try {
        const response = await fetch('/api/clients');
        const clients = await response.json();

        // Reset table and selector content
        clientTable.innerHTML = '';
        clientSelector.innerHTML = '';

        // Check for clients and display message if none found
        if (clients.length === 0) {
            clientTable.innerHTML = '<tr><td colspan="2" class="center">No clients found</td></tr>';
        } else {
            // Populate client table and selector dropdown
            clientTable.innerHTML = '<tr><th>Client Name</th><th>Linked Contacts</th></tr>';
            clients.forEach(client => {
                const row = `<tr><td>${client.name}</td><td>${client.linkedContacts}</td></tr>`;
                clientTable.innerHTML += row;

                const option = document.createElement('option');
                option.value = client.name;
                option.textContent = client.name;
                clientSelector.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Error loading clients:", error);
    }
}

// Render Contact List with Error Handling
async function renderContacts() {
    const contactTable = document.getElementById('contactTable');

    try {
        const response = await fetch('/api/contacts');
        const contacts = await response.json();

        // Reset table content
        contactTable.innerHTML = '';

        // Check for contacts and display message if none found
        if (contacts.length === 0) {
            contactTable.innerHTML = '<tr><td colspan="4" class="center">No contacts found</td></tr>';
        } else {
            // Populate contact table with data
            contactTable.innerHTML = '<tr><th>Contact Name</th><th>Email</th><th>Client Name</th><th>Action</th></tr>';
            contacts.forEach((contact, index) => {
                const row = `<tr>
                                <td>${contact.fullName}</td>
                                <td>${contact.email}</td>
                                <td>${contact.clientName}</td>
                                <td><button onclick="unlinkContact(${index})">Unlink</button></td>
                             </tr>`;
                contactTable.innerHTML += row;
            });
        }
    } catch (error) {
        console.error("Error loading contacts:", error);
    }
}

// Add New Client
async function addClient() {
    const name = document.getElementById('clientNameInput').value.trim();
    if (!name) {
        alert("Client name is required");
        return;
    }

    try {
        const response = await fetch('/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            renderClients();
            document.getElementById('clientNameInput').value = '';  // Clear input
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error("Error adding client:", error);
    }
}

// Add New Contact
async function addContact() {
    const fullName = document.getElementById('contactNameInput').value.trim();
    const email = document.getElementById('contactEmailInput').value.trim();
    const clientName = document.getElementById('clientSelector').value;

    if (!fullName || !email || !clientName) {
        alert("All contact fields are required");
        return;
    }

    try {
        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, clientName })
        });

        if (response.ok) {
            renderContacts();
            document.getElementById('contactNameInput').value = ''; // Clear inputs
            document.getElementById('contactEmailInput').value = '';
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error("Error adding contact:", error);
    }
}

// Unlink a Contact from Client
async function unlinkContact(index) {
    try {
        const response = await fetch(`/api/contacts/${index}`, { method: 'DELETE' });

        if (response.ok) {
            renderContacts();  // Refresh contact list
        } else {
            alert("Error unlinking contact");
        }
    } catch (error) {
        console.error("Error unlinking contact:", error);
    }
}

// Tab Navigation
function openTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tabcontent').forEach(content => {
        content.style.display = 'none';
    });

    // Show the selected tab
    document.getElementById(tabName).style.display = 'block';
}
