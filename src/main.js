const express = require("express");
const cors = require("cors");
const { openReverseGeocoder } = require("@geolonia/open-reverse-geocoder");
const { normalize } = require("@geolonia/normalize-japanese-addresses");
const app = express();

const config = {
	port: process.env.PORT || 3000
}

// クロスオリジンを許可
app.use(cors());
// http://localhost:3000
app.use("/", express.static("public"));
// http://localhost:3000/reverseGeoCoding?lat=35.04486&lng=135.73016
app.get("/reverseGeoCoding", async (request, response) => {
	const longitude = parseFloat(request.query.lng);
	const latitude = parseFloat(request.query.lat);
	try {
		const result = await openReverseGeocoder([longitude, latitude]);
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