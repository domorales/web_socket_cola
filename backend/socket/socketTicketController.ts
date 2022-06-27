import { Socket } from 'socket.io';
import AdminTicket from '../core/ticket/AdminTicket';

const adminTicket = new AdminTicket();
const socketTicketController = (socket: Socket) => {
	console.log('cliente conectado');

	socket.emit('last_number_ticket', adminTicket.getlastPosition());
	socket.emit('last_four_tickets', adminTicket.ticketsToJson().lastFourTickets);
	socket.emit('queue_tickets_pendent', adminTicket.sizeListTicketPendent());

	socket.on('next_ticket', (payload, callback) => {
		const ticket = adminTicket.next();
		callback(ticket.toJson());
	});

	socket.on('attend_ticket', (payload, callback) => {
		const { office } = payload;
		const response = {
			isSuccess: false,
			numberTicket: 0,
			message: '',
		};
		if (!office) {
			response.message = 'Enviar oficina';
			return callback(response);
		}
		const ticket = adminTicket.attention(office);
		if (!ticket) {
			response.message = 'No hay ticket';
			return callback(response);
		}
		response.isSuccess = true;
		response.numberTicket = ticket.toJson().number;
		callback(response);

		socket.broadcast.emit('last_four_tickets', adminTicket.ticketsToJson().lastFourTickets);
		socket.broadcast.emit('queue_tickets_pendent', adminTicket.sizeListTicketPendent());
	});
};
export default socketTicketController;
