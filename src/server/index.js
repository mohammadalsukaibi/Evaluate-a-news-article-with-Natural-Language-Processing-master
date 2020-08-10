var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var aylien = require('aylien_textapi');
var bodyParser = require('body-parser')
var cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

const textapi = new aylien({
    application_id: `${process.env.API_ID}`,
    application_key: `${process.env.API_KEY}`
});

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/api', async (req, res, next) => {
  console.log(req.body);

  var data = textapi.sentiment({
    'text': req.body.theText
  }, function(error, response) {
    if (error === null) {
      console.log(response);
      res.send(response);
    }else{
      console.log("error occured in api");
    }
  });
})

module.exports = app;