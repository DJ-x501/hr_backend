const express  = require('express');
const cors = require('cors');
const indexRoute = require('./indexRoute');
const errorHandler = require('../middleware/errorHandler');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204,
};


//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/v1", indexRoute);

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;
