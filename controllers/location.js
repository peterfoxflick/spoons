var exports = module.exports = {};
var model = require("../models/location.js");


exports.create = function(request, response, pool) {
	// First get the person's id
	var name = request.query.name;

	// TODO: We should really check here for a valid id before continuing on...

	// use a helper function to query the DB, and provide a callback for when it's done
	model.create(name, pool, function(error) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.

		// Make sure we got a row with the person, then prepare JSON to send back
		if (error) {
			response.status(500).json({success: false, data: error});
		} else {
			response.status(200).json({success: true});
		}
	});
}


exports.get = function(request, response, pool) {

		// First get the person's id
		var id = request.query.id;

		// TODO: We should really check here for a valid id before continuing on...

		// use a helper function to query the DB, and provide a callback for when it's done
		model.get(id, pool, function(error, result) {
			// This is the callback function that will be called when the DB is done.
			// The job here is just to send it back.

			// Make sure we got a row with the person, then prepare JSON to send back
			if (error || result == null) {
				response.status(500).json({success: false, data: error});
			} else {
				response.status(200).json(result[0]);
			}
		});
	}



exports.getAll = function(request, response, pool) {
		// TODO: We should really check here for a valid id before continuing on...

		// use a helper function to query the DB, and provide a callback for when it's done
		model.getAll(pool, function(error, result) {
			// This is the callback function that will be called when the DB is done.
			// The job here is just to send it back.

			// Make sure we got a row with the person, then prepare JSON to send back
			if (error || result == null) {
				response.status(500).json({success: false, data: error});
			} else {
				response.status(200).json(result);
			}
		});
	}
