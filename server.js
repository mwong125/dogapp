const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const App = require('./app/App.js');
const appPupup = new App();

const appServer = express();
appServer.use(express.static('static'));
appServer.use(bodyParser.json());

/*  get all sits */
appServer.get('/api/home/sits/', function(reqObj, resObj) {
    appPupup.getAllSits().then((getResult) => {
	resObj.json({ data: getResult });
    }).catch((error_message) => {
	resObj.status(500).send(error_message);
    });
});

/* get specific set of sits from single parameter */
appServer.get('/api/home/sits/:identifier_param/:identifier_value/', (reqObj, resObj) => {
    appPupup.getSpecificSitBy(reqObj.params.identifier_param, '=', reqObj.params.identifier_value).then((getResult) => {
        resObj.json({ data: getResult });
    }).catch((error_message) => {
        resObj.status(500).send(error_message);
    });
});

appServer.get('/api/schedule/date/:sitType/:year/:month/:date', (reqObj, resObj) => {
    console.log("got date request for month: " + reqObj.params.month + ", date: " + reqObj.params.date);
    appPupup.getSpecificSitByJson(reqObj.params.sitType, {
	year: reqObj.params.year,
	month: App.monthToInt(reqObj.params.month),
	date: reqObj.params.date }).then((getResult) => {
	    resObj.json(getResult);
	}).catch((error_message) => {
	    resObj.status(500).send(error_message);
	});
});

appServer.get('/api/schedule/date/:year/:month/:date/', (reqObj, resObj) => {
    console.log("got date request for month: " + reqObj.params.month + ", date: " + reqObj.params.date);
    appPupup.getSpecificSitByJsonAllTypes({
	year: reqObj.params.year,
	month: App.monthToInt(reqObj.params.month),
	date: reqObj.params.date
    }).then((getResult) => {
	resObj.json(getResult);
    }).catch((error_message) => {
	resObj.status(500).send(error_message);
    });
});

appServer.get('/api/schedule/format/', (reqObj, resObj) => {
    console.log("got schedule format request");
    console.log(appPupup.getMonthFormat());
    let format = { week: appPupup.getWeekFormat(), month: appPupup.getMonthFormat() };
    resObj.json(format);
});

appServer.get('/api/schedule/', (reqObj, resObj) => {
    console.log("got schedule request");
    resObj.json(appPupup.getFullSchedule());
});

appServer.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/static/index.html'), function(err) {
      if (err) {
	  res.status(500).send(err)
      }
  })
})

appServer.listen(3000, function() {
    console.log('App started');
});
