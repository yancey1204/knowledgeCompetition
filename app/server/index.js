const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;        // set our port

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test'); // connect to our database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongodb');
  // we're connected!
});

const Bear = require('./model/bear');


app.use(express.static('dist'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.send(path.resolve(__dirname, '../../dist/index.html'));   
});

router.route('/bears')
  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post((req, res) => {
    let bear = new Bear();      // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function(err) {
      if (err)
        res.send(err);

        res.json({ message: 'Bear created!' });
      });
      
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});
