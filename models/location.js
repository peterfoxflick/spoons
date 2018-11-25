var exports = module.exports = {};



// SQL TABLE

// CREATE TABLE location (
//  id             SERIAL          NOT NULL,
//  name           TEXT            NOT NULL,
//  PRIMARY KEY( id )
// );


//CREATE
exports.create = function(name, callback) {
  //Check that name is string and min length
  if ((typeof name) == "string"){
    var sql = "INSERT INTO location (name) VALUE $1::string";

    // We now set up an array of all the parameters we will pass to fill the
    // placeholder spots we left in the query.
    var params = [name];

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
      console.log("Create new location: " + JSON.stringify(result.rows));


      // When someone else called this function, they supplied the function
      // they wanted called when we were all done. Call that function now
      // and pass it the results.

      // (The first parameter is the error variable, so we will pass null.)
      callback(null, result.rows);
    });
  }
}

//READ
exports.get = function(id, callback) {
      var sql = "SELECT * FROM location WHERE id = $1::int";

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
        console.log("Found location: " + JSON.stringify(result.rows[0]));


        // When someone else called this function, they supplied the function
        // they wanted called when we were all done. Call that function now
        // and pass it the results.

        // (The first parameter is the error variable, so we will pass null.)
        callback(null, result.rows[0]);
      });
  }

//UPDATE
exports.update = function(id, name, callback) {
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


      // When someone else called this function, they supplied the function
      // they wanted called when we were all done. Call that function now
      // and pass it the results.

      // (The first parameter is the error variable, so we will pass null.)
      callback(null, result.rows[0]);
    });
  }
}




//DESTROY
