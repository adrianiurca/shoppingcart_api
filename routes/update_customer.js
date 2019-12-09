var express = require('express');
var router = express.Router();
var queries = require('./../queries');
var helpers = require('./../helpers');
var Error = require('./../error').Error;

router.put('/', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          let options = ['email', 'name', 'day_phone', 'eve_phone', 'mob_phone'];
          if(Object.keys(data).filter(element => options.indexOf(element) > -1).length > 0) {
            queries.updateUser(result.email, req.body)
              .then(function(result) {
                res.json(result[0]);
              })
              .catch(function(reason) {
                res.status(500).json(reason);
              });
          } else {
            res.status(400).json({message: 'Unsupported fields!'});
          }
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

router.put('/address', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          let options = ['address_1', 'address_2', 'city', 'region', 'postal_code', 'shipping_region_id'];
          if(Object.keys(data).filter(element => options.indexOf(element) > -1).length > 0) {
            queries.updateUser(result.email, req.body)
              .then(function(result) {
                res.json(result[0]);
              })
              .catch(function(reason) {
                res.status(500).json(reason);
              });
          } else {
            res.status(400).json({message: 'Unsupported fields!'});
          }
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

router.put('/creditCard', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          let options = ['credit_card'];
          if(Object.keys(data).filter(element => options.indexOf(element) > -1).length > 0) {
            queries.updateUser(result.email, req.body)
              .then(function(result) {
                res.json(result[0]);
              })
              .catch(function(reason) {
                res.status(500).json(reason);
              });
          } else {
            res.status(400).json({message: 'Unsupported fields!'});
          }
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
