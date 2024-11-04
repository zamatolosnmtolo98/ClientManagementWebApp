const apiUrl = 'http://localhost:3000/api';

// Function to open the tab
function openTab(evt, tabName) {
    const tabcontents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = 'none';
    }
    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Client form submission
document.getElementById('clientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const clientName = document.getElementById('clientName').value;

    // Create new client via API
    const response = await fetch(`${apiUrl}/clients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: clientName })
    });
    await response.json(); // Await client creation
    renderClientList();

    // Clear form
    this.reset();
});

// Function to render the client list
async function renderClientList() {
    const response = await fetch(`${apiUrl}/clients`);
    const clients = await response.json();
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = ''; // Clear previous list

    // Populate the client list
    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.code}</td>
            <td>${client.linkedContacts}</td>
        `;
        clientList.appendChild(row);
    });

    // Populate the client dropdown for contacts
    const clientSelect = document.getElementById('clientSelect');
    clientSelect.innerHTML = '<option value="">Select a client</option>'; // Clear previous options
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.name;
        option.textContent = client.name;
        clientSelect.appendChild(option);
    });
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const contactName = document.getElementById('fullName').value;
    const contactEmail = document.getElementById('email').value;
    const clientName = document.getElementById('clientSelect').value;

    // Create new contact via API
    const response = await fetch(`${apiUrl}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName: contactName, email: contactEmail, clientName })
    });
    await response.json(); // Await contact creation
    renderContactList();

    // Clear form
    this.reset();
});

// Function to render the contact list
async function renderContactList() {
    const response = await fetch(`${apiUrl}/contacts`);
    const contacts = await response.json();
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = ''; // Clear previous list

    // Check if there are contacts to display
    if (contacts.length === 0) {
        contactList.innerHTML = '<tr><td colspan="3" class="center">No contact(s) found</td></tr>';
        return; // No contacts to display
    }

    // Populate the contact list
    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.fullName}</td>
            <td>${contact.email}</td>
            <td>${contact.clientName}</td>
        `;
        contactList.appendChild(row);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    renderClientList();
    renderContactList();
    openTab(event, 'Clients'); // Open Clients tab by default
});
