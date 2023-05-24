import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const clients = new Set();


wss.on('connection', (ws) => {

  clients.add(ws);


  ws.on('message', (message) => {

    broadcastMessage(message);
  });


  ws.on('close', () => {

    clients.delete(ws);
  });
});


function broadcastMessage(message, isBinary) {
  clients.forEach((client) => {

      client.send(message, {binary : isBinary});
  })
}
