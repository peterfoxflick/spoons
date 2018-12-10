var exports = module.exports = {};
var model = require("../models/enroll.js");


exports.new = function(request, response, pool) {

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


exports.remove = function(request, response, pool) {

	var user_id = request.query.user_id;
	var game_id = request.query.game_id;

	//First get that players target
	model.target(user_id, game_id, pool, function(error, tResult) {
			if (error) {
				response.status(500).json({success: false, data: error});
			} else {
				var target_id = tResult.target_id;
				//then get who has them
				if(target_id) {
					model.getUserFromTarget(game_id, user_id, pool, function(error, gResult) {
							if (error) {
								response.status(500).json({success: false, data: error});
							} else {
								//now update who has them to get their target
								model.update(gResult.id, target_id, pool, function(error, result) {
									//finaly delete them from the game
									model.delete(user_id, game_id, pool, function(error) {
										if (error) {
											response.status(500).json({success: false, data: error});
										} else {
											response.status(200).json({success: true});
										}
										});
								})
					}
				});
			} else {
				model.delete(user_id, game_id, pool, function(error) {
					if (error) {
						response.status(500).json({success: false, data: error});
					} else {
						response.status(200).json({success: true});
					}
					});
			}

	}
})


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
					response.status(200).json(result);
				}
			});
		}

		exports.target = function(request, response, pool) {

				// First get the person's id
				var user_id = request.query.user_id;
				var game_id = request.query.game_id;


				// use a helper function to query the DB, and provide a callback for when it's done
				model.target(user_id, game_id, pool, function(error, result) {
					// This is the callback function that will be called when the DB is done.
					// The job here is just to send it back.

					// Make sure we got a row with the person, then prepare JSON to send back
					if (error || result == null) {
						response.status(500).json({success: false, data: error});
					} else {
						response.status(200).json({target: result.target_id});
					}
				});
			}
