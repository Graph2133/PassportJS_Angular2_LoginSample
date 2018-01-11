var express  = require('express');
var app      = express();
const router = express.Router(); // Creates a new router object.
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var config = require('./config/database.js');
const cors = require('cors'); 
const path = require('path'); // NodeJS Package for file paths
require('./config/passport')(passport); // pass passport for configuration
const authentication = require('./routes/authentication')(router,passport);
// Database Connection
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});
   app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true) 
        next();
    });
 
app.use(cors({ origin: 'http://localhost:4200' }));

// set up our express application
 
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.enable('trust proxy'); 
// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    saveUninitialized: false, resave: false, 
    proxy: true
}));

 
app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.use(authentication); 

 // Start Server: Listen on port 8080
app.listen(8080, () => {
  console.log('Listening on port 8080');
});
 