var express = require('express');
var router = express.Router();
var queries = require('./../queries');
var helpers = require('./../helpers');
var Error = require('./../error').Error;

router.post('/', function(req, res, next) {
  queries.addUser(req.body)
    .then(function(result) {
      res.status(201).json(result);
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.post('/login', function(req, res, next) {
  queries.loginUser(req.body)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.post('/facebook', function(req, res, next) {
  let facebookToken = typeof req.body.access_token === 'string' ? req.body.access_token : false;
  if(facebookToken) {
    queries.loginUser(req.body, true)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(reason) {
        res.status(500).json(reason);
      });
  }
});

router.get('/', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.getUser(result.email)
            .then(function(result) {
              res.json(result[0]);
            })
            .catch(function(reason) {
              res.status(500).json(reason);
            });
        } else {
          res.status(403).json({error: 'Token expired!'});
        }
      })
      .catch(function(reason) {
        res.status(500).json(reason);
      })
  } else {
    res.json((new Error({code: 'AUT_01', field: 'USER-KEY'})).show());
  }
});

module.exports = router;
