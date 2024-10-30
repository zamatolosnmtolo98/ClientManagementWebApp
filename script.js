const clients = [];
const contacts = [];

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

// Add new client
document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const clientName = document.getElementById('clientName').value;
    const clientCode = document.getElementById('clientCode').value;

    // Create a new client object
    const client = {
        name: clientName,
        code: clientCode,
        linkedContacts: 0
    };

    // Add client to the list and render
    clients.push(client);
    renderClientList();

    // Clear form
    this.reset();
});

// Function to render the client list
function renderClientList() {
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = ''; // Clear previous list

    // Check if there are clients to display
    if (clients.length === 0) {
        clientList.innerHTML = '<tr><td colspan="3" class="center">No client(s) found</td></tr>';
        return; // No clients to display
    }

    // Sort clients by name
    clients.sort((a, b) => a.name.localeCompare(b.name));

    // Populate the client list
    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.code}</td>
            <td class="center">${client.linkedContacts}</td>
        `;
        clientList.appendChild(row);
    });
    
    // Update client selector in contact form
    updateClientSelector();
}

// Function to update client selector in contact form
function updateClientSelector() {
    const clientSelector = document.getElementById('clientSelector');
    clientSelector.innerHTML = '<option value="">Select Client</option>'; // Reset options

    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.name;
        option.textContent = client.name;
        clientSelector.appendChild(option);
    });
}

// Link new contact
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const clientName = document.getElementById('clientSelector').value;

    // Find the client by name
    const client = clients.find(c => c.name === clientName);
    if (client) {
        // Create a new contact object
        const contact = {
            fullName: contactName,
            email: contactEmail,
            clientName: clientName
        };

        // Add contact to the list and render
        contacts.push(contact);
        renderContactList();
        
        // Increment linked contacts count in the client
        client.linkedContacts += 1;

        // Clear form
        this.reset();
    }

    updateClientSelector(); // Refresh the client selector
});

// Function to render the contact list
function renderContactList() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = ''; // Clear previous list

    // Check if there are contacts to display
    if (contacts.length === 0) {
        contactList.innerHTML = '<tr><td colspan="3" class="center">No contact(s) found</td></tr>';
        return; // No contacts to display
    }

    // Sort contacts by full name
    contacts.sort((a, b) => {
        const nameA = a.fullName.toLowerCase();
        const nameB = b.fullName.toLowerCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    // Populate the contact list
    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.fullName.split(', ').reverse().join(', ')}</td> 
            <td>${contact.email}</td>
            <td><a href="#" onclick="unlinkContact(${index})">Unlink</a></td>
        `;
        contactList.appendChild(row);
    });
}

// Function to unlink a contact
function unlinkContact(index) {
    const contact = contacts[index];
    const client = clients.find(c => c.name === contact.clientName);

    // Remove the contact from the list
    contacts.splice(index, 1);

    // Decrement linked contacts count in the client
    if (client) {
        client.linkedContacts -= 1;
    }

    renderClientList(); // Refresh the client list
    renderContactList(); // Refresh the contact list
}
