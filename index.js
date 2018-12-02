var express = require('express')
var bodyParser = require('body-parser')

const path = require('path')
const PORT = process.env.PORT || 8000

const { Pool } = require("pg"); // This is the postgres database connection module.
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


//Add Controllers
var location = require('./controllers/location.js');
var player = require('./controllers/player.js');
var game = require('./controllers/game.js');
var enroll = require('./controllers/enroll.js');



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
app.get('/play', function(req, res){
  res.render('pages/play', {user_id: req.query.user_id});
});


//LOCATIONS ///////////////////////////////////////////////////////
app.get('/location', function(request, response) {
	location.get(request, response, pool);
});

app.get('/locations', function(request, response) {
	location.getAll(request, response, pool);
});

app.post('/location', function(request, response) {
	location.create(request, response, pool);
});


//USER ///////////////////////////////////////////////////////



app.post('/player/new', function(request, response) {
	player.new(request, response, pool);
});

app.post('/player/edit', function(request, response) {
	player.edit(request, response, pool);
});




//GAME ///////////////////////////////////////////////////////


app.post('/game/new', function(request, response) {
	game.new(request, response, pool);
});

app.post('/game/start', function(request, response) {
	game.start(request, response, pool);
  enroll.start(request, response, pool);
});



//ENROLLMENT ///////////////////////////////////////////////////////

app.post('/enroll/add', function(request, response) {
	enroll.new(request, response, pool);
});

app.post('/enroll/start', function(request, response) {
	enroll.start(request, response, pool);
});

app.get('/enroll/my', function(request, response) {
	enroll.getFromUserId(request, response, pool);
});

app.post('/enroll/tag', function(request, response) {
	enroll.tag(request, response, pool);
});

app.get('/target', function(request, response) {
	enroll.target(request, response, pool);
});






app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'pages/index'));
});



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))






//PASSPORT STUFF

/*************

var passport = require('passport');

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy((username, password, callback) => {
  var sql = "SELECT id, username, password, type FROM users WHERE username=$1";

  // We now set up an array of all the parameters we will pass to fill the
  // placeholder spots we left in the query.
  var params = [username];

  // This runs the query, and then calls the provided anonymous callback function
  // with the results.
  pool.query(sql, params, function(err) {
    // If an error occurred...
    if (err) {
      console.log("Error in query: ")
      console.log(err);
      callback(err);
    }

    if(result.rows.length > 0) {
      const first = result.rows[0]
      bcrypt.compare(password, first.password, function(err, res) {
        if(res) {
          callback(null, { id: first.id, username: first.username })
         } else {
          callback(null, false)
         }
       })
     } else {
       callback(null, false)
     }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, callback) => {
  var sql = "SELECT id, username FROM users WHERE id = $1";

  // We now set up an array of all the parameters we will pass to fill the
  // placeholder spots we left in the query.
  var params = [id];

  // This runs the query, and then calls the provided anonymous callback function
  // with the results.
  pool.query(sql, params, function(err) {
    if(err) {
      console.log("Error when selecting user on session deserialize: ")
      console.log(err);
      callback(err);
    }
  }

    callback(null, results.rows[0])
  })
});





************/
