class Client {
    static clientCodes = new Set(); // To ensure unique client codes
    static clientCodeSuffixes = {}; // To track suffixes for each client prefix

    constructor(name) {
        this.name = name;
        this.code = this.generateClientCode(name);
        this.linkedContacts = 0;
    }

    // Function to generate a unique client code
    generateClientCode(clientName) {
        const prefix = clientName.substring(0, 3).toUpperCase();
        let code;

        // Initialize the suffix for this prefix if it doesn't exist
        if (!Client.clientCodeSuffixes[prefix]) {
            Client.clientCodeSuffixes[prefix] = 1; // Start from 001
        } else {
            Client.clientCodeSuffixes[prefix]++;
        }

        const suffix = String(Client.clientCodeSuffixes[prefix]).padStart(3, '0');
        code = prefix + suffix;

        // Check for uniqueness and regenerate if necessary
        while (Client.clientCodes.has(code)) {
            Client.clientCodeSuffixes[prefix]++;
            const newSuffix = String(Client.clientCodeSuffixes[prefix]).padStart(3, '0');
            code = prefix + newSuffix;
        }

        Client.clientCodes.add(code); // Add the new code to the set
        return code;
    }
}

class Contact {
    constructor(fullName, email, clientName) {
        this.fullName = fullName;
        this.email = email;
        this.clientName = clientName;
    }
}

class ClientManager {
    constructor() {
        this.clients = [];
        this.contacts = [];
    }

    addClient(clientName) {
        const client = new Client(clientName);
        this.clients.push(client);
        return client;
    }

    addContact(fullName, email, clientName) {
        const contact = new Contact(fullName, email, clientName);
        this.contacts.push(contact);
        
        // Increment linked contacts count in the client
        const client = this.clients.find(c => c.name === clientName);
        if (client) {
            client.linkedContacts++;
        }
    }

    unlinkContact(index) {
        const contact = this.contacts[index];
        const client = this.clients.find(c => c.name === contact.clientName);

        // Remove the contact from the list
        this.contacts.splice(index, 1);

        // Decrement linked contacts count in the client
        if (client) {
            client.linkedContacts--;
        }
    }
}

// Instantiate ClientManager
const clientManager = new ClientManager();

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

// Function to validate input
function validateClientName(clientName) {
    return clientName && clientName.trim().length > 0;
}

function validateContactDetails(contactName, contactEmail) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    return contactName && contactName.trim().length > 0 && emailPattern.test(contactEmail);
}

// Add new client
document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const clientName = document.getElementById('clientName').value;

    // Validate client name
    if (!validateClientName(clientName)) {
        alert('Please enter a valid client name.');
        return;
    }

    // Add client through ClientManager
    const client = clientManager.addClient(clientName);
    renderClientList();

    // Clear form
    this.reset();
});

// Function to render the client list
function renderClientList() {
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = ''; // Clear previous list

    // Check if there are clients to display
    if (clientManager.clients.length === 0) {
        clientList.innerHTML = '<tr><td colspan="3" class="center">No client(s) found</td></tr>';
        return; // No clients to display
    }

    // Sort clients by name
    clientManager.clients.sort((a, b) => a.name.localeCompare(b.name));

    // Populate the client list
    clientManager.clients.forEach(client => {
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

    clientManager.clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.name;
        option.textContent = client.name;
        clientSelector.appendChild(option);
    });
}

// Link new contact
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const clientName = document.getElementById('clientSelector').value;

    // Validate contact details
    if (!validateContactDetails(contactName, contactEmail)) {
        alert('Please enter valid contact details.');
        return;
    }

    // Add contact through ClientManager
    clientManager.addContact(contactName, contactEmail, clientName);
    renderContactList();

    // Clear form
    this.reset();
});

// Function to render the contact list
function renderContactList() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = ''; // Clear previous list

    // Check if there are contacts to display
    if (clientManager.contacts.length === 0) {
        contactList.innerHTML = '<tr><td colspan="3" class="center">No contact(s) found</td></tr>';
        return; // No contacts to display
    }

    // Sort contacts by full name
    clientManager.contacts.sort((a, b) => {
        const nameA = a.fullName.toLowerCase();
        const nameB = b.fullName.toLowerCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    // Populate the contact list
    clientManager.contacts.forEach((contact, index) => {
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
    clientManager.unlinkContact(index); // Use ClientManager to unlink
    renderClientList(); // Refresh the client list
    renderContactList(); // Refresh the contact list
}
