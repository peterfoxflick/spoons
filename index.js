var express = require('express')
var bodyParser = require('body-parser')

const path = require('path')
const PORT = process.env.PORT || 8000

const { Pool } = require("pg"); // This is the postgres database connection module.
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


//Add Controllers
var location = require('./controllers/location.js');



var app = express()


if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



app.get('/', (req, res) => res.render('pages/index'));


app.get('/location', function(request, response) {
	location.get(request, response, pool);
});

app.post('/location', function(request, response) {
	location.create(request, response);
});



app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'pages/index'));
});



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))



//CREATE
function locationCreateDB(name, callback) {
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


function createLocation(request, response) {
	// First get the person's id
	var name = request.query.name;

	// TODO: We should really check here for a valid id before continuing on...

	// use a helper function to query the DB, and provide a callback for when it's done
	locationCreateDB(name, function(error, result) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.

		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.status(200).json(result[0]);
		}
	});
}



//DESTROY
