var exports = module.exports = {};


// SQL TABLE

// CREATE TABLE location (
//  id             SERIAL          NOT NULL,
//  name           TEXT            NOT NULL,
//  PRIMARY KEY( id )
// );


//CREATE
exports.create = function(user_id, game_id, pool, callback) {
  //Check that name is string and min length
    var sql = "INSERT INTO enrollment (user_id, game_id) VALUES ($1, $2)";

    // We now set up an array of all the parameters we will pass to fill the
    // placeholder spots we left in the query.
    var params = [user_id, game_id];

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
      var sql = "SELECT * FROM enrollment WHERE id = $1::int";

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
        console.log("Found location(s): " + JSON.stringify(result.rows));

        // (The first parameter is the error variable, so we will pass null.)
        callback(null, result.rows);
      });
  }


exports.start = function(game_id, pool, callback) {
      var sql = "SELECT * FROM enrollment WHERE game_id = 1"

      // We now set up an array of all the parameters we will pass to fill the
      // placeholder spots we left in the query.
      var params = [];

      // This runs the query, and then calls the provided anonymous callback function
      // with the results.
      pool.query(sql, params, function(err, result) {
        // If an error occurred...
        if (err) {
          console.log("Error in query: ")
          console.log(err);
          callback(err, null);
        }

        console.log("Showing enrollment");

        // Log this to the console for debugging purposes.
        for (var i = 0; i < result.rows.length; i++) {
          console.log("Found enrollment: " + JSON.stringify(result.rows[i]));
        }

        console.log("end enrollment");




      });
  }


//UPDATE
exports.update = function(id, name, pool, callback) {
  //Check that name is string and min length
  if ((typeof id) == "number"){
    var sql = "UPDATE location SET name = $2::string WHERE id = $1::int";

    // We now set up an array of all the parameters we will pass to fill the
    // placeholder spots we left in the query.
    var params = [id, name];

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
      console.log("Updated locatoin: " + JSON.stringify(result.rows[0]));

      // (The first parameter is the error variable, so we will pass null.)
      callback(null, result.rows[0]);
    });
  }
}




//DESTROY
