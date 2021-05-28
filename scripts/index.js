import setUpPage from './set_up_page.js';

document.addEventListener('DOMContentLoaded', () => {
	setUpPage();
	document.querySelector('form').onsubmit = handleSubmit;
});

function handleSubmit(e) {
	e.preventDefault();

	const mapContainer = document.getElementById('map');
	mapContainer.innerHTML = '<h1 class="loading-text">Loading...</h1>';

	const input = document.querySelector('.input');

	const ipRegExp = RegExp(`(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}`);
	const domainRegExp = RegExp(`^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$`);

	/* check whether input is an ip-address or a domain-name or an invalid input */
	if (ipRegExp.test(input.value)) {
		setUpPage('ipAddress', input.value);
	}
	else if (domainRegExp.test(input.value)) {
		setUpPage('domain', input.value);
	}
	else {
		alert('Please enter a domain name or an ip address.');
	}
}