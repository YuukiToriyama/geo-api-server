const express = require("express");
const { openReverseGeocoder } = require("@geolonia/open-reverse-geocoder");
const { normalize } = require("@geolonia/normalize-japanese-addresses");
const app = express();

const config = {
	port: 3000
}

app.get("/", (request, response) => {
	response.send("Hello, world!");
});
// http://localhost:3000/latlng2address?lng=35.04486&lat=135.73016
app.get("/reverseGeoCoding", async (request, response) => {
	const longitude = parseFloat(request.query.lng);
	const latitude = parseFloat(request.query.lat);
	try {
		const result = await openReverseGeocoder([latitude, longitude]);
		response.json(result);
	} catch (error) {
		response.json({
			"Error": {
				"message": "Invalid parameter"
			}
		});
	}
});
// http://localhost:3000/normalize?address=北海道札幌市西区24-2-2-3-3
app.get("/normalizeAddress", async (request, response) => {
	const address = request.query.address;
	try {
		const result = await normalize(address);
		response.json(result);
	} catch (error) {
		response.json({
			"Error": {
				"message": error.message
			}
		});
	}
})
app.listen(config.port, () => {
	console.log("listening at http://localhost:" + config.port);
});