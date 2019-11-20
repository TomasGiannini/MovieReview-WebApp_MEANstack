const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');

const app = express();

mongoose.connect('mongodb+srv://tomasgiannini:tomasgiannini@cluster0-qbk4p.mongodb.net/Lab5?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database...');
  })
  .catch(() => {
    console.log('Connection to database failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//header shit so browsers wont deny requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reviews', reviewRoutes);


module.exports = app;
