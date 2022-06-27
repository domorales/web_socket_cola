import http from 'http';
import { Server } from 'socket.io';
import app from '../app';
import socketTicketController from '../socket/socketTicketController';

const server = http.createServer(app),
	io = new Server(server),
	port = app.get('port');

io.on('connection', (socket) => {
	socketTicketController(socket);
});
server
	.listen(port, () => {
		console.log(`EXITO AL LEVANTAR SERVER EN EL PUERTO ${port}`);
	})
	.on('error', (err) => {
		console.error(`ERROR AL LEVANTAR SERVER EN EL PUERTO ${port}`);
		console.error(err);
	});
