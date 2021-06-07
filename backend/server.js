const express = require('express'),
  app = express(),
  server = require('http').Server(app),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  multer = require('multer'),
  upload = multer({ dest: 'upload/' }),
  errorHandler = require('./lib/errorHandler'),
  authCheck = require('./lib/authCheck'),
  route = require('./lib/joinRoutes'),
  config = require('./config');

// db();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/*
Making connection on every query insertion and closing connection
if find any optimised way change it (try not to keep connection open)
*/
//enable cors
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'authorization', 'version'],
    exposedHeaders: ['api_key', 'authorization'],
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,PATCH',
    preflightContinue: false,
  })
);
authCheck(app, ['*/public/*']);
app.use('/public/docs', express.static(__dirname + '/apiDoc'));
// app.use(upload.single('file'));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*"); // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  ); // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  ); // Set to true if you need the website to include cookies in the requests sent // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true); // Pass to next layer of middleware
  next();
});

(async () => {
  await route(app, "routes", __dirname + "/modules");
  app.use(errorHandler);
})();

server.listen(config.server.port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started at : " + config.server.port);
  }
});
