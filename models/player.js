var exports = module.exports = {};

//CREATE

exports.create = function(name, username, password, location_id, pool, callback) {
  //Check that name is string and min length
    var sql = "INSERT INTO player (name, username, password, location_id) VALUES ($1, $2, $3, $4)";

    // We now set up an array of all the parameters we will pass to fill the
    // placeholder spots we left in the query.
    var params = [name, username, password, location_id];

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
      var sql = "SELECT * FROM player WHERE id = $1::int";

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
        console.log("Found player: " + JSON.stringify(result.rows));

        // (The first parameter is the error variable, so we will pass null.)
        callback(null, result.rows);
      });
  }



//UPDATE
exports.update = function(id, name, username, password, location_id, pool, callback) {
  //Check that name is string and min length

    var sql = "UPDATE player SET name = $2, username = $3, password = $4, location_id = $5 WHERE id = $1::int";

    // We now set up an array of all the parameters we will pass to fill the
    // placeholder spots we left in the query.
    var params = [id, name, username, password, location_id];

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
      console.log("Updated player: " + JSON.stringify(result.rows[0]));

      // (The first parameter is the error variable, so we will pass null.)
      callback(null, result.rows[0]);
    });
  }




//DESTROY
