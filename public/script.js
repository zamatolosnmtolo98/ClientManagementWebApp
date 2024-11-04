async function renderClients() {
    const clientTable = document.getElementById('clientTable');
    const clientSelector = document.getElementById('clientSelector');

    try {
        const response = await fetch('/api/clients');
        const clients = await response.json();

        clientTable.innerHTML = '';
        clientSelector.innerHTML = '';

        if (clients.length === 0) {
            clientTable.innerHTML = '<tr><td colspan="2" class="center">No clients found</td></tr>';
        } else {
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

async function renderContacts() {
    const contactTable = document.getElementById('contactTable');

    try {
        const response = await fetch('/api/contacts');
        const contacts = await response.json();

        contactTable.innerHTML = '';

        if (contacts.length === 0) {
            contactTable.innerHTML = '<tr><td colspan="4" class="center">No contacts found</td></tr>';
        } else {
            contactTable.innerHTML = '<tr><th>Contact Name</th><th>Email</th><th>Client Name</th><th>Action</th></tr>';
            contacts.forEach((contact, index) => {
                const row = `<tr><td>${contact.fullName}</td><td>${contact.email}</td><td>${contact.clientName}</td><td><button onclick="unlinkContact(${index})">Unlink</button></td></tr>`;
                contactTable.innerHTML += row;
            });
        }
    } catch (error) {
        console.error("Error loading contacts:", error);
    }
}

async function addClient() {
    const name = document.getElementById('clientNameInput').value;
    if (!name) return alert("Client name is required");

    await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    renderClients();
}

async function addContact() {
    const fullName = document.getElementById('contactNameInput').value;
    const email = document.getElementById('contactEmailInput').value;
    const clientName = document.getElementById('clientSelector').value;
    if (!fullName || !email || !clientName) return alert("All fields are required");

    await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, clientName })
    });
    renderContacts();
}

async function unlinkContact(index) {
    await fetch(`/api/contacts/${index}`, { method: 'DELETE' });
    renderContacts();
}

function openTab(tabName) {
    document.querySelectorAll('.tabcontent').forEach(content => content.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}
