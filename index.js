#!usr/bin/env node

const messages	= require("./messages");
const router	= require("./routing");

const express	= require("express");
const app		= express();

const server	= require("http").createServer(app);
const WebSocket	= require("ws");

const wss		= new WebSocket.Server({ server: server });
const clients	= new Set();

wss.on("connection", ws => {
	clients.add(ws);
	ws.on("message", message => clients.forEach(client => client === ws ? messages.save(JSON.parse(message.toString())) : client.send(message.toString())));
});

app.use(express.static("public"));
app.use('/', router);

server.listen(3000, () => console.log('\n[!] Listening on port 3000.\n'));
