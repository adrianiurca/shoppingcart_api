var express = require('express');
var router = express.Router();
var queries = require('./../queries');
var Error = require('./../error').Error;

router.get('/', function(req, res, next) {
  queries.getCategories()
    .then(function(result) {
      res.json({rows: result});
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get('/:id', function(req, res, next) {
  queries.getCategoryById(req.params.id)
    .then(function(result) {
      if(result.length > 0) {
        res.json(result[0]);
      } else {
        res.json((new Error({code: 'CAT_01', field: 'category.id'})).show());
      }
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get('/inProduct/:id', function(req, res, next) {
  queries.getCategoryForProduct(req.params.id)
    .then(function(result) {
      res.json({rows: result});
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get('/inDepartment/:id', function(req, res, next) {
  queries.getCategoriesFromDepartment(req.params.id)
    .then(function(result) {
      res.json({rows: result});
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

module.exports = router;
