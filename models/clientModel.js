class Client {
    constructor(name) {
        this.name = name;
        this.linkedContacts = 0;
    }

    static clients = [];

    static getAll() {
        return this.clients;
    }

    static addClient(name) {
        const client = new Client(name);
        this.clients.push(client);
        return client;
    }

    static incrementLinkedContacts(clientName) {
        const client = this.clients.find(c => c.name === clientName);
        if (client) client.linkedContacts += 1;
    }
}

module.exports = Client;
