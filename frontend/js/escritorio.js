const d = document,
	urlParams = new URLSearchParams(window.location.search),
	numberDesktop = urlParams.get('escritorio'),
	socket = io(),
	$title_desktop = d.getElementById('title_desktop'),
	$button_attend_next_ticket = d.getElementById('button_attend_next_ticket'),
	$number_ticket = d.getElementById('number_ticket'),
	$message_error_ticket = d.getElementById('message_error_ticket'),
	$size_tickets_pendent = d.getElementById('size_tickets_pendent');

$message_error_ticket.style.display = '';

socket.on('connect', () => {
	$button_attend_next_ticket.enabled = true;
});

socket.on('disconnect', () => {
	$button_attend_next_ticket.enabled = false;
});

socket.on('queue_tickets_pendent', (size) => {
	$size_tickets_pendent.innerText = size;
});

d.addEventListener('DOMContentLoaded', () => {
	$title_desktop.innerText = `${$title_desktop.innerText} ${numberDesktop}`;
	$message_error_ticket.style.display = 'none';
});

d.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target === $button_attend_next_ticket) {
		socket.emit('attend_ticket', { office: parseInt(numberDesktop) }, (response) => {
			const { isSuccess, numberTicket } = response;

			if (isSuccess) {
				$number_ticket.innerText = numberTicket;
				return;
			}

			$number_ticket.innerText = 'NADIE';
			$message_error_ticket.style.display = '';
		});
	}
});
