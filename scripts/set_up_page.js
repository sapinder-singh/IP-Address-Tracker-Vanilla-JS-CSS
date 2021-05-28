import fetchData from './fetch.js';
import setMap from './map.js';

/* Fetch query can be made with either an ipAddress or a domain */
async function setUpPage(queryType, queryValue) {
	const data = await fetchData(queryType, queryValue);

	displayUserInfo(data);
	setMap(data.location);
}

function displayUserInfo({ ip, location, isp }) {
	const [ IP, Location, TimeZone, ISP ] = document.getElementsByClassName('data-value');

	IP.innerText = ip;
	Location.innerText = `${location.region}, ${location.country} ${location.postalCode}`;
	TimeZone.innerText = 'UTC ' + location.timezone;
	ISP.innerText = isp;
}

export default setUpPage;