var express = require('express');
var router = express.Router();
var queries = require('./../queries');
var helpers = require('./../helpers');
var Error = require('./../error').Error;

router.post('/', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.addOrder(req.body)
            .then(function(result) {
              res.status(201).send(result[0]);
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

router.get('/orders/:id', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.getOrder(req.params.id)
            .then(function(result) {
              res.send(result);
            })
            .catch(function(reason) {
              res.status(500).json(reason);
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

router.get('/orders/inCustomer/:id', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.getOrderForACustomer(req.params.id)
            .then(function(result) {
              res.send({rows: result});
            })
            .catch(function(reason) {
              res.status(500).json(reason);
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

router.get('/orders/shortDetail/:id', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.getOrder(req.params.id, true)
            .then(function(result) {
              res.send(result);
            })
            .catch(function(reason) {
              res.status(500).json(reason);
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
