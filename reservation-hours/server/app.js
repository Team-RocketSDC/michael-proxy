const path = require('path');
const express = require('express');
const db = require('./database');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/:restaurant_id/reservation', (req, res) => {
  const id = req.params.restaurant_id;
  db.getReservations(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/api/:restaurant_id/hour', (req, res) => {
  const id = req.params.restaurant_id;
  db.getHours(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/:restaurant_id/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(5882);
