const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');

const user = require('./controllers/routes/user');

const port = 5000; // Could be in a .env file and load with dotenv package

const app = express();

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, // Could be held in a .env file to keep it secret and loaded with dotenv package
  { // options
    useMongoClient: true
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error'));

// Setup morgan logging unless in test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

// Middleware setup for json parsing and raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

// Default root response
app.get("/", (req, res) => res.json({text: "User Persistence API"}));

app.route("/api/user")
  .post(user.postUser)
  .get(user.getUser)
  .put(user.updateUser)
  .delete(user.deleteUser);

app.listen(port);
console.log("Server started on port " + port);

module.exports = app; // for testing
