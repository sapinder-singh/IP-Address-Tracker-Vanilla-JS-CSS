const COMMON_ENDPOINT = 'https://geo.ipify.org/api/v1?apiKey=at_6Sn4JeMD9Mq9neDhjzFzjeEDHeLPo';
const ERR_ALERT = 'Something went wrong! Please check the console for more info.';
var map, marker;

document.addEventListener('DOMContentLoaded', () => {
	setData('ipAddress');

	document.querySelector('form').onsubmit = handleSubmit;
});


/* Fetch query can be made with either an ipAddress or a domain */
async function setData(query, queryValue) {
	const data = await fetchData(query, queryValue);

	displayUserInfo(data);

	setMap(data.location);
}




async function fetchData(query, queryValue) {
	let err = false;
	/* if it's initial setup i.e. no queryValue passed */
	if(!queryValue) {
		return await fetch(COMMON_ENDPOINT)

			.then(res => { 
				if(res.ok) 
					return res.json();

				else {
					err = true;
					return res.json();
				}
			})

			.then(data => {
				if(err) {
					console.log(err);
					alert(ERR_ALERT);
					return;
				}
				
				return data;
			});
	}

	else {
		return await fetch(`${COMMON_ENDPOINT}&${query}=${queryValue}`)

			.then(res => {
				if(res.ok) 
					return res.json();

				else {
					err = true;
					return res.json();
				}
			})

			.then(data => {
				if(err) {
					console.log(err);
					alert(ERR_ALERT);
					return;
				}
				
				return data;
			});
	}
}



function displayUserInfo({ip, location, isp}) {
	const [IP, Location, TimeZone, ISP] = document.getElementsByClassName('data-value');

	IP.innerText = ip;
	Location.innerText = `${location.region}, ${location.country} ${location.postalCode}`;
	TimeZone.innerText = 'UTC ' + location.timezone;
	ISP.innerText = isp;
}



function setMap({lat, lng}) {
	/* reset map when it's to be refreshed for the queried ipAddress/domain */
	if(map) {
		map.remove();
		map = undefined;
		document.getElementById('map').innerHTML = '';
	}

	map = L.map('map').setView([lat, lng], 7);

	tileAttribution = 
		`<a href="https://www.maptiler.com/copyright/" target="_blank">
			&copy; MapTiler
		 </a>
		 <a href="https://www.openstreetmap.org/copyright" target="_blank">
			&copy; OpenStreetMap contributors
		 </a>`;

	L.tileLayer	('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=PBw3UFPJIOtPuMHgmMfn', {
		attribution: tileAttribution
	}).addTo(map);


	let markerIcon = L.icon({
		iconUrl: './images/icon-location.svg',
	})

	marker = L.marker([lat, lng], {icon: markerIcon}).addTo(map);
}




function handleSubmit(e) {
	e.preventDefault();
	
	const input = document.querySelector('.input');
	
	const ipRegExp = RegExp(`(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}`);
	const domainRegExp = RegExp(`^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$`);


	if(ipRegExp.test(input.value)) {
		setData('ipAddress', input.value);
	}
	else if(domainRegExp.test(input.value)) {
		setData('domain', input.value);
	}
	else {
		alert('Invalid String! :(');
	}
}
