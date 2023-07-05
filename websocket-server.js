const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Store the object data
let objectData = {};

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send the current object data to the newly connected client
  ws.send(JSON.stringify(objectData));

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Update the object data
    objectData = JSON.parse(message);

    // Send the updated object data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(objectData));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});