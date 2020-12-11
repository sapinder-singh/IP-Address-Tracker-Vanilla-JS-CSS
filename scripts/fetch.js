const COMMON_ENDPOINT = 'https://geo.ipify.org/api/v1?apiKey=at_6Sn4JeMD9Mq9neDhjzFzjeEDHeLPo';

async function checkResponse(res) { 
	if(res.ok) 
		return res.json();
	
	/* throw the error */
	const err = await res.json();
	throw new Error(err.messages);
};

async function fetchData(queryType, queryValue) {	
	
	/* If no queries passed, then it's the initial setup after page loads */
	const requestString = !queryType 
		? COMMON_ENDPOINT : `${COMMON_ENDPOINT}&${queryType}=${queryValue}`;

	return await 
		fetch(requestString)
			.then(checkResponse)
			.then(data => data)

			.catch(err => {
				console.error(err);
				alert('Something went wrong. Please check the console for more info.');
			});
}

export default fetchData;