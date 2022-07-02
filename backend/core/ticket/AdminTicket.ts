import fs from 'fs';
import path from 'path';

import Ticket from './Ticket';

export default class AdminTicket {
	private today: number;
	private tickets: Ticket[];
	private lastFourTickets: Ticket[];
	private lastPosition: number;
	constructor() {
		this.today = new Date().getDay();
		this.tickets = [];
		this.lastFourTickets = [];
		this.lastPosition = 0;
		this.init();
	}
	init() {
		const { today, tickets, lastFourTickets, lastPosition } = require('../../data.json');
		if (today === this.today) {
			this.tickets = tickets.map((ticket: any) => {
				return new Ticket(ticket.number, ticket.office);
			});
			this.lastPosition = lastPosition;
			this.lastFourTickets = lastFourTickets.map((ticket: any) => {
				return new Ticket(ticket.number, ticket.office);
			});
			return;
		}
		this.save();
	}
	save() {
		const pathFile = path.join(__dirname, '../../data.json');
		fs.writeFileSync(pathFile, JSON.stringify(this.ticketsToJson()));
	}
	ticketsToJson() {
		return {
			today: this.today,
			tickets: this.tickets,
			lastFourTickets: this.lastFourTickets,
			lastPosition: this.lastPosition,
		};
	}
	next() {
		this.lastPosition++;
		this.tickets.push(new Ticket(this.lastPosition, null));
		this.save();
		return this.tickets.at(-1);
	}
	attention(office: number) {
		const isEmptyQueueTickets = this.tickets.length === 0;
		if (isEmptyQueueTickets) {
			return null;
		}
		const ticket = this.tickets.shift();
		this.lastFourTickets.unshift(ticket);
		const isGreaterThanFourLength = this.lastFourTickets.length > 4;
		if (isGreaterThanFourLength) {
			this.lastFourTickets.pop();
		}
		ticket.assignOffice(office);
		this.save();
		return ticket;
	}
	public getLastPosition() {
		return this.lastPosition;
	}

	public sizeListTicketPendent(): number {
		return this.tickets.length;
	}
}
