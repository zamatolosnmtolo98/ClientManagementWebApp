// Client model representing a client
class Client {
    constructor(id, name) {
        this.id = id; // Unique identifier for the client
        this.name = name; // Name of the client
    }
}

// In-memory array to store clients
const clients = [];

// Function to get all clients
function getAllClients() {
    return clients; // Return the array of clients
}

// Function to add a new client
function addClient(name) {
    const newClient = new Client(clients.length + 1, name); // Create a new client with a unique ID
    clients.push(newClient); // Add the new client to the array
    return newClient; // Return the newly created client
}

// Export functions for use in controllers
module.exports = {
    getAllClients,
    addClient
};
