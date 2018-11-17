var express = require('express')
var bodyParser = require('body-parser')

const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('pages/index', {price: "Calculator"}))

app.post('/postage', function(req, res) {
  var w = req.body.weight;
  var t = req.body.type;
  var price = "Error: To heavy";

  if (t == "stamp") {
    if (w < 1) {
      price = 0.50;
    } else if (w < 2) {
      price = 0.71
    } else if (w < 3) {
      price = 0.92
    } else if (w < 3.5) {
      price = 1.13
    }
  } else if (t == "meter") {
    if (w < 1) {
      price = 0.47;
    } else if (w < 2) {
      price = 0.68
    } else if (w < 3) {
      price = 0.89
    } else if (w < 3.5) {
      price = 1.10
    }
  } else if (t == "flat") {
    var rate = [1.00, 1.21, 1.42, 1.63, 1.84, 2.05, 2.26, 2.47, 2.68, 2.89, 3.10, 3.31, 3.52]
    var i = Math.floor(w);
    if(i < rate.length) {
      price = rate[i];
    }
  } else if (t == "first-class") {
    var rate = [3.50, 3.50, 3.50, 3.50, 3.75, 3.75, 3.75, 3.75, 4.10, 4.45, 4.80, 5.15, 5.50]
    var i = Math.floor(w);
    if(i < rate.length) {
      price = rate[i];
    }
  }

  if (price != "Error: To heavy") {
    price = "$" + price;
  }

  res.render('pages/index', {price: price});
})




app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
