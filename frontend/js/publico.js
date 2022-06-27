const socket = io(),
	d = document,
	$lblTicket1 = d.getElementById('lblTicket1'),
	$lblEscritorio1 = d.getElementById('lblEscritorio1'),
	$lblTicket2 = d.getElementById('lblTicket2'),
	$lblEscritorio2 = d.getElementById('lblEscritorio2'),
	$lblTicket3 = d.getElementById('lblTicket3'),
	$lblEscritorio3 = d.getElementById('lblEscritorio3'),
	$lblTicket4 = d.getElementById('lblTicket4'),
	$lblEscritorio4 = d.getElementById('lblEscritorio4');

socket.on('last_four_tickets', (tickets) => {
	const audio = new Audio('../audio/new-ticket.mp3');
	audio.play();

	const [ticket1, ticket2, ticket3, ticket4] = tickets;

	if (ticket1) {
		$lblTicket1.innerText = `Ticket ${ticket1.number}`;
		$lblEscritorio1.innerText = `Escritorio ${ticket1.office}`;
	}
	if (ticket2) {
		$lblTicket2.innerText = `Ticket ${ticket2.number}`;
		$lblEscritorio2.innerText = `Escritorio ${ticket2.office}`;
	}
	if (ticket3) {
		$lblTicket3.innerText = `Ticket ${ticket3.number}`;
		$lblEscritorio3.innerText = `Escritorio ${ticket3.office}`;
	}
	if (ticket4) {
		$lblTicket4.innerText = `Ticket ${ticket4.number}`;
		$lblEscritorio4.innerText = `Escritorio ${ticket4.office}`;
	}
});
