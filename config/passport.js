// config/passport.js
// taken from 		https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		    done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, pool, done) {
      var sql = "SELECT * FROM players WHERE id = $1::int";

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
        }

        // Log this to the console for debugging purposes.
        console.log("Found player: " + JSON.stringify(result.rows[0]));

        // (The first parameter is the error variable, so we will pass null.)
        callback(err, result.rows[0]);
      });
    });


 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, name, username, password, pool, done) {

    var sql = "SELECT * FROM players WHERE username = '"+username+"'"";

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
        return done(err)
      }

      if (rows.length) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
       } else {

         var newUserMysql = new Object();

         newUserMysql.username    = username;
         newUserMysql.password = password; // use the generateHash function in our user model

         var sql = "INSERT INTO player ( name, username, password ) values ('" + name +"','"+ username +"','"+ password +"')";

         var params = [];

         // This runs the query, and then calls the provided anonymous callback function
         // with the results.
         pool.query(sql, params, function(err, result) {
            newUserMysql.id = rows.insertId;
            return done(null, newUserMysql);

      }
    });




    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, pool, done) { // callback with email and password from our form

         connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

			// if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);

		});



    }));
