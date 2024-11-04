const Client = require('./clientModel');

class Contact {
    constructor(fullName, email, clientName) {
        this.fullName = fullName;
        this.email = email;
        this.clientName = clientName;
    }

    static contacts = [];

    static getAll() {
        return this.contacts;
    }

    static addContact(fullName, email, clientName) {
        const contact = new Contact(fullName, email, clientName);
        this.contacts.push(contact);
        Client.incrementLinkedContacts(clientName);
        return contact;
    }

    static unlinkContact(index) {
        this.contacts.splice(index, 1);
    }
}

module.exports = Contact;
