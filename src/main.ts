import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import * as NormalizeLatLng from '@geolonia/normalize-any-latlng';
import { normalize } from '@geolonia/normalize-japanese-addresses';
import { openReverseGeocoder } from '@geolonia/open-reverse-geocoder';
import fastify from 'fastify';
import * as path from "path";

const app = fastify({
	logger: true
});

app.register(fastifyStatic, {
	root: path.join(process.cwd(), "public")
});

app.register(cors);

interface ReverseGeoCodingQueryParameter {
	lat: number
	lng: number
}
app.get<{ Querystring: ReverseGeoCodingQueryParameter }>("/reverseGeoCoding", async (request, reply) => {
	const longitude = request.query.lat;
	const latitude = request.query.lng;
	try {
		const result = await openReverseGeocoder([longitude, latitude]);
		reply.send(result);
	} catch (error) {
		reply.send({
			"Error": {
				"message": "Invalid parameter"
			}
		});
	}
});

interface NormalizeAddressQueryParameter {
	address: string
	level?: number
}
app.get<{ Querystring: NormalizeAddressQueryParameter }>("/normalizeAddress", async (request, reply) => {
	const address = request.query.address;
	const level = request.query.level || 3;
	try {
		const result = await normalize(address, {
			level: level
		});
		reply.send(result);
	} catch (error) {
		reply.send({
			"Error": {
				"message": error
			}
		});
	}
});

interface NormalizeLatLngQueryParameter {
	expression: string
}
app.get<{ Querystring: NormalizeLatLngQueryParameter }>("/normalizeLatLng", (request, reply) => {
	const expression = request.query.expression;
	const result = NormalizeLatLng.normalize(expression);
	reply.send(result);
});

(async () => {
	const port = process.env.PORT !== undefined ? parseInt(process.env.PORT) : 3000;
	try {
		await app.listen({
			port: port
		});
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
})();