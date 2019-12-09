var express = require('express');
var router = express.Router();
var helpers = require('./../helpers');
var queries = require('./../queries');
var Error = require('./../error').Error;

router.post('/charge', function(req, res, next) {
  let headers = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
  if(headers.startsWith('Bearer ')) {
    let token = headers.slice(7, headers.length);
    helpers.checkToken(token)
      .then(function(result) {
        if(!helpers.isExpired(result)) {
          queries.getOrder(req.body.order_id, true)
            .then(function(getOrdeResult) {
              queries.getUser(req.body.email)
                .then(function(result) {
                  let data = {
                    stripeToken: process.env.STRIPE_TOKEN,
                    ...req.body,
                    description: `Order[${getOrdeResult.reference}] - ${result.name}`,
                    amount: getOrdeResult.total_amount,
                    currency: process.env.DEFAULT_CURRENCY
                  };
                  helpers.stripeCharge(data)
                    .then(function(result) {
                      res.send(result);
                    })
                    .catch(function(reason) {
                      res.status(500).send(reason);
                    });
                })
                .catch(function(reason) {
                  res.status(500).send(reason);
                });
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
