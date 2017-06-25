var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg')

router.get('/prices', function(req, res, next) {
  pg.connect('postgres://localhost:5432/nima', function(err, client, done) {
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
