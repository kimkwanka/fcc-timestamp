const express = require('express');
const http = require('http');
const path = require('path');
const stylus = require('stylus');

const app = express();

//Use process.env.PORT if set for Heroku, AWS, etc.
const port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.get('/', function(req, res, next) {
  res.render('index', {title: 'FCC Timestamp Microservice', url:'https://kk-fcc-timestamp.herokuapp.com'});  
});

/*//Enable Stylus preprocessor as middleware
app.use(stylus.middleware({
    src: path.join(__dirname, '/res'),
    dest: path.join(__dirname, '/public'),
    compile: ((str, filepath) => {
      return stylus(str)
      .set('filename', filepath)
      .set('compress', true);
    })
}));
app.use( express.static(path.join(__dirname, 'public')) );*/

//Prevent browser's favicon request from triggering our microservice 
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.get('/:dateStr', function(req, res, next) {
  let date
  let unixtime = parseInt(req.params.dateStr, 10);
  let offset
  let timestamp = {
    unix: null,
    natural: null
  };

  if ( isNaN(unixtime) ) {
    //Param is no number, try to interpret as natural date string
    date = new Date(req.params.dateStr);
    //Conversion of natural date string to Date obj takes timezone into consideration
    //therefore we need to get the offset
    offset = date.getTimezoneOffset() * 60;
  } else {
    //Param is a number, interpret as unix timestamp
    date = new Date(unixtime * 1000);
    //Unixtimestamps result in the same Date obj regardless of timezone
    //so we need no offset
    offset = 0;
  }

  //If param was interpreted as a 'valid date', build the JSON data to return
  if (!isNaN(date.getTime())) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];
    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    timestamp = {
      unix: date.getTime() / 1000 - offset,
      natural: `${month} ${day}, ${year}`
    };
  }
  
  res.json(timestamp);
});

app.get('*', function(req, res) {
  res.render('404', {});
});

app.listen(port);
