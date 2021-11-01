module.exports = (req, res) => {
	
	const https = require('https');
	const querystring = require('querystring');
	
	//const { name = 'World' } = req.query;
	
	let requestData = "";
	
	const npsReqParams = {
		parkCode: "acad",
		api_key: process.env.NPS_API_TOKEN
	};
	
	const options = {
		hostname: 'developer.nps.gov',
		path: '/api/v1/parks?' + querystring.stringify(npsReqParams),
		method: 'get'
	};
	
	const npsReq = https.request(options, npsRes => {
		npsRes.on("data", d => {
			res.status(200).send(d);
		});
	});
	/*
	npsReq.on('error', error => {
		res.status(200).send("API Call failed!");
	});*/
	
	npsReq.end();
};