module.exports = (req, res) => {
	
	const https = require('https');
	
	//const { name = 'World' } = req.query;
	
	const options = {
		hostname: 'developer.nps.gov',
		path: '/api/v1/parks',
		method: 'get'
	};
	
	let requestData = "";
	
	const npsReqParams = {
		parkCode: "acad",
		api_key: process.env.NP_API_TOKEN
	};
	
	const npsReq = https.request(options, npsRes => {
		npsRes.on("data", d => {
			res.status(200).send(d);
		});
	});
	
	npsReq.on('error', error => {
		res.status(200).send("API Call failed!");
	});
	
	npsReq.write(new TextEncoder().encode(JSON.stringify(npsReqParams)));
	npsReq.end();
};