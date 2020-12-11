import {setUpEverything} from './index.js';

function handleSubmit(e) {
	e.preventDefault();
	
	const input = document.querySelector('.input');
	
	const ipRegExp = RegExp(`(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}`);
	const domainRegExp = RegExp(`^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$`);

	/* check whether input is an ip-address or a domain-name or an invalid input */
	if(ipRegExp.test(input.value)) {
		setUpEverything('ipAddress', input.value);
	}
	else if(domainRegExp.test(input.value)) {
		setUpEverything('domain', input.value);
	}
	else {
		alert('Invalid String! :(');
	}
}

export default handleSubmit;