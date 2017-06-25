var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg')

router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'), { title: 'Your Used Car Lot' });
});

router.get('/cars', function(req, res, next) {
  pg.connect('postgres://localhost:5432/nima', function(err, client, done) {
    if (err) throw err;

    client
      .query('SELECT * FROM cars ORDER BY id DESC')
        .then(data => {
          res.status(200)
            .json({
              status: 'success',
              data: data.rows
            })
        })
    done()
  });
  pg.end()

});

router.post('/cars', function(req, res, next) {
  const data = req.body
  const newCarData = [data.make, data.model, data.year]
  pg.connect('postgres://localhost:5432/nima', function(err, client, done) {
    if (err) throw err;

    client
      .query(`INSERT into cars (make, model, year) VALUES ($1, $2, $3)`, newCarData)
        .then(() => {
          res.status(200)
            .json({
              status: 'success',
            })
        })
    done()
  });
  pg.end()
});
module.exports = router;
