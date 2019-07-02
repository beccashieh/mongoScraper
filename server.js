//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

//Set our port to be either host's designation or 3000.
const PORT = process.env.PORT || 5000;

//Initiates express
const app = express();

//Database configuration
const databaseUrl = 'mongoHeadlines';
const collections = ['headlines'];

const db = mongojs(databaseUrl, collections);
db.on('error', function(error) {
    console.log('Database Error:', error);
});

//Sets up express router
const router = express.Router();

//Require the routes file to pass out router object
require('./config/routes')(router);


//Makes public folder a static directory
app.use(express.static('public'));
app.use(express.static('/assets/javascript'))


//Connect handlebars to our Express App
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Use body parser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));

//All requests go through the middleware
app.use(router);

app.get('/', function(req, res) {
    res.send('Hello World');
});


//Sets up server connection
app.listen(8000, function() {
    console.log(`Server is running on ${PORT}`);
});