var exports = module.exports = {};
var model = require("../models/player.js");


exports.new = function(request, response, pool) {
	var title = request.query.title;
	var host_id = request.query.player_id;
	var state = 0;
	var location_id = request.query.location_id;

	// use a helper function to query the DB, and provide a callback for when it's done
	model.create(title, host_id, state, location_id, pool, function(error) {
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


exports.edit = function(request, response, pool) {

		// First get the person's id
		var id = request.query.id;
		var name = request.query.name;
		var username = request.query.username;
		var password = request.query.password;
		var location_id = request.query.location_id;


		// use a helper function to query the DB, and provide a callback for when it's done
		model.update(id, name, username, password, location_id, pool, function(error, result) {
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


	exports.start = function(request, response, pool) {

			// First get the person's id
			var id = request.query.id;

			// use a helper function to query the DB, and provide a callback for when it's done
			model.start(id, pool, function(error, result) {
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
