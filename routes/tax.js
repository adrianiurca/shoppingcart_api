var express = require('express');
var router = express.Router();
var queries = require('./../queries');
var helpers = require('./../helpers');
var Error = require('./../error').Error;

router.get('/', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.listTaxes()
            .then(function(result) {
              res.send({rows: result});
            })
            .catch(function(reason) {
              res.status(500).send(reason);
            });
        } else {
          res.status(403).send({error: 'Token expired!'});
        }
      })
      .catch(function(reason) {
        res.status(500).json(reason);
      });
  } else {
    res.json((new Error({code: 'AUT_01', field: 'USER-KEY'})).show());
  }
});

router.get('/:id', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.getTax(req.params.id)
            .then(function(result) {
              res.send(result);
            })
            .catch(function(reason) {
              res.status(500).send(reason);
            });
        } else {
          res.status(403).send({error: 'Token expired!'});
        }
      })
      .catch(function(reason) {
        res.status(500).json(reason);
      });
  } else {
    res.json((new Error({code: 'AUT_01', field: 'USER-KEY'})).show());
  }
});

module.exports = router;
