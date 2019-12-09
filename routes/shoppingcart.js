var express = require('express');
var router = express.Router();
var queries = require('./../queries');
var helpers = require('./../helpers');
var Error = require('./../error').Error;
var uuidv1 = require('uuid/v1');

router.get('/generateUniqueId', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          let uuid = uuidv1();
          res.send({cart_id: uuid});
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

router.post('/add', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.addProductToCart(req.body)
            .then(function(result) {
              res.status(201).send(result);
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
          queries.listProductsFromShoppingCart(req.params.id)
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

router.put('/update/:id', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.updateItem(req.params.id, req.body)
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

router.delete('/empty/:id', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.emptyCart(req.params.id)
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

router.delete('/removeProduct/:id', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.removeProductFromCart(req.params.id)
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
