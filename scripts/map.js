let map, marker;

function setMap({ lat, lng }) {
	/* reset map when it's to be refreshed for the queried ipAddress/domain */
	if (map) {
		map.remove();
		map = undefined;
		document.getElementById('map').innerHTML = '';
	}

	map = L.map('map').setView([ lat, lng ], 7);

	const tileAttribution =
		`<a href="https://www.maptiler.com/copyright/" target="_blank">
			&copy; MapTiler
		 </a>
		 <a href="https://www.openstreetmap.org/copyright" target="_blank">
			&copy; OpenStreetMap contributors
		 </a>`;

	L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=PBw3UFPJIOtPuMHgmMfn', {
		attribution: tileAttribution
	}).addTo(map);


	let markerIcon = L.icon({
		iconUrl: './images/icon-location.svg',
	})

	marker = L.marker([ lat, lng ], { icon: markerIcon }).addTo(map);
}

export default setMap;