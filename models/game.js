var exports = module.exports = {};



//CREATE
exports.create = function(title, host_id, state, location_id, pool, callback) {
  //Check that name is string and min length
    var sql = "INSERT INTO game (title, host_id, state, location_id) VALUES ($1, $2, $3, $4)";

    // We now set up an array of all the parameters we will pass to fill the
    // placeholder spots we left in the query.
    var params = [title, host_id, state, location_id];

    // This runs the query, and then calls the provided anonymous callback function
    // with the results.
    pool.query(sql, params, function(err) {
      // If an error occurred...
      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err);
      }

      // (The first parameter is the error variable, so we will pass null.)
      callback(null);
    });
}

//READ
exports.get = function(id, pool, callback) {
      var sql = "SELECT * FROM game WHERE id = $1::int";

      // We now set up an array of all the parameters we will pass to fill the
      // placeholder spots we left in the query.
      var params = [id];

      // This runs the query, and then calls the provided anonymous callback function
      // with the results.
      pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
          console.log("Error in query: ")
          console.log(err);
          callback(err, null);
        }

        // Log this to the console for debugging purposes.
        console.log("Found game: " + JSON.stringify(result.rows));

        // (The first parameter is the error variable, so we will pass null.)
        callback(null, result.rows);
      });
  }

  //READ
  exports.getAllWithUserId = function(id, pool, callback) {
        var sql = "SELECT game.title, player.name FROM game INNER JOIN enrollment on enrollment.game_id = game.id INNER JOIN player on player.id = enrollment.target_id WHERE enrollment.user_id = $1;";

        // We now set up an array of all the parameters we will pass to fill the
        // placeholder spots we left in the query.
        var params = [id];

        // This runs the query, and then calls the provided anonymous callback function
        // with the results.
        pool.query(sql, params, function(err, result) {
          // If an error occurred...
          if (err) {
            console.log("Error in query: ")
            console.log(err);
            callback(err, null);
          }

          // Log this to the console for debugging purposes.
          console.log("Found Enrollment in games: " + JSON.stringify(result.rows));

          // (The first parameter is the error variable, so we will pass null.)
          callback(null, result.rows);
        });
    }

//UPDATE
exports.start = function(id, pool, callback) {
  //Check that name is string and min length
    var sql = "UPDATE game SET state = 1 WHERE id = $1::int";

    // We now set up an array of all the parameters we will pass to fill the
    // placeholder spots we left in the query.
    var params = [id];

    // This runs the query, and then calls the provided anonymous callback function
    // with the results.
    pool.query(sql, params, function(err, result) {
      // If an error occurred...
      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }

      // Log this to the console for debugging purposes.
      console.log("Updated game: " + id);

      // (The first parameter is the error variable, so we will pass null.)
      callback(null);
    });
  }




//DESTROY
