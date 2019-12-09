var express = require('express');
var router = express.Router();
var queries = require('./../queries');

router.get('/', function(req, res, next) {
  queries.getAttributes()
    .then(function(result) {
      res.json({rows: result});
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get('/:id', function(req, res, next) {
  queries.getAttributeById(req.params.id)
    .then(function(result) {
      res.json(result[0]);
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get('/values/:id', function(req, res, next) {
  queries.getValuesFromAttribute(req.params.id)
    .then(function(result) {
      res.json({rows: result});
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get('/inProduct/:id', function(req, res, next) {
  queries.getValuesForProduct(req.params.id)
    .then(function(result) {
      res.json({rows: result});
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

module.exports = router;
