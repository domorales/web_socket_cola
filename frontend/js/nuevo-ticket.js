const socket = io(),
	d = document,
	$button_create_ticket = d.getElementById('button_create_ticket'),
	$label_new_ticket = d.getElementById('label_new_ticket');

socket.on('connect', () => {
	$button_create_ticket.enabled = true;
});

socket.on('disconnect', () => {
	$button_create_ticket.enabled = false;
});

d.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target === $button_create_ticket)
		socket.emit('next_ticket', null, (ticket) => {
			$label_new_ticket.innerText = `Ticket ${ticket.number}`;
		});
});

d.addEventListener('DOMContentLoaded', () => {
	socket.on('last_number_ticket', (last_number) => {
		$label_new_ticket.innerText = `Ticket ${last_number}`;
	});
});
