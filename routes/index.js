var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg')

pg.defaults.ssl = true;

router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'), { title: 'Your Used Car Lot' });
});

router.get('/cars', function(req, res, next) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
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
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
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


router.get('/prices', function(req, res, next) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    client
      .query('SELECT * FROM prices WHERE car_id = $1 ORDER BY year ASC', [req.query.id])
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
})

module.exports = router;
