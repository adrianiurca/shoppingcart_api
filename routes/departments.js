var express = require('express');
var router = express.Router();
var queries = require('./../queries');
var Error = require('./../error').Error;

router.get('/', function(req, res, next) {
  queries.getDepartments()
    .then(function(result) {
      res.json({rows: result});
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get('/:id', function(req, res, next) {
  if(isNaN(req.params.id)) {
    let error = new Error({code: 'DEP_01', field: 'department.id'});
    res.json(error.show());
  } else {
    queries.getDepartmentById(req.params.id)
      .then(function(result) {
        res.json(result[0]);
      })
      .catch(function(reason) {
        res.status(500).json(reason);
      });
  }
});

module.exports = router;
