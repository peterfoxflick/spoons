var exports = module.exports = {};
var model = require("../models/enroll.js");


exports.create = function(request, response, pool) {

	var user_id = request.query.user_id;
	var game_id = request.query.game_id;

	// use a helper function to query the DB, and provide a callback for when it's done
	model.create(user_id, game_id, pool, function(error) {
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
