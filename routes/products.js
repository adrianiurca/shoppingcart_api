var express = require("express");
var router = express.Router();
var queries = require("./../queries");
var Error = require("./../error").Error;

router.get("/", function(req, res, next) {
  let params = {};
  if (typeof req.query.page === "undefined") {
    params.page = 1;
  } else {
    params.page = req.query.page;
  }
  if (typeof req.query.limit === "undefined") {
    params.limit = 20;
  } else {
    params.limit = req.query.limit;
  }
  if (typeof req.query.description_length === "undefined") {
    params.description_length = 200;
  } else {
    params.description_length = req.query.description_length;
  }
  queries
    .getProducts(params)
    .then(function(result) {
      res.json({ rows: result });
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get("/search", function(req, res, next) {
  let params = {};
  if (typeof req.query.page === "undefined") {
    params.page = 1;
  } else {
    params.page = req.query.page;
  }
  if (typeof req.query.limit === "undefined") {
    params.limit = 20;
  } else {
    params.limit = req.query.limit;
  }
  if (typeof req.query.description_length === "undefined") {
    params.description_length = 200;
  } else {
    params.description_length = req.query.description_length;
  }
  if (typeof req.query.query_string !== "undefined") {
    params.query_string = req.query.query_string;
  }
  if (typeof req.query.all_words !== "undefined") {
    params.all_words = req.query.all_words;
  }
  queries
    .getSearchProducts(params)
    .then(function(result) {
      res.json({ rows: result });
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get("/:id", function(req, res, next) {
  let params = {
    id: req.params.id
  };
  if (typeof req.query.page !== "undefined") {
    params.page = req.query.page;
  } else {
    params.page = 1;
  }
  if (typeof req.query.limit !== "undefined") {
    params.limit = req.query.limit;
  } else {
    params.limit = 20;
  }
  if (typeof req.query.description_length !== "undefined") {
    params.description_length = req.query.description_length;
  } else {
    params.description_length = 200;
  }
  queries
    .getProductById(params)
    .then(function(result) {
      res.json(result[0]);
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get("/inCategory/:id", function(req, res, next) {
  let params = {
    id: req.params.id
  };
  if (typeof req.query.page !== "undefined") {
    params.page = req.query.page;
  } else {
    params.page = 1;
  }
  if (typeof req.query.limit !== "undefined") {
    params.limit = req.query.limit;
  } else {
    params.limit = 20;
  }
  if (typeof req.query.description_length !== "undefined") {
    params.description_length = req.query.description_length;
  } else {
    params.description_length = 200;
  }
  queries
    .getProductsInACategory(params)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get("/inDepartment/:id", function(req, res, next) {
  let params = {
    id: req.params.id
  };
  if (typeof req.query.page !== "undefined") {
    params.page = req.query.page;
  } else {
    params.page = 1;
  }
  if (typeof req.query.limit !== "undefined") {
    params.limit = req.query.limit;
  } else {
    params.limit = 20;
  }
  if (typeof req.query.description_length !== "undefined") {
    params.description_length = req.query.description_length;
  } else {
    params.description_length = 200;
  }
  queries
    .getProductsInADepartment(params)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.get("/:id/reviews", function(req, res, next) {
  queries
    .getReviewsForProduct(req.params.id)
    .then(function(result) {
      res.json({ rows: result });
    })
    .catch(function(reason) {
      res.status(500).json(reason);
    });
});

router.post("/:id/reviews", function(req, res, next) {
  let headers =
    typeof req.headers.authorization === "string"
      ? req.headers.authorization
      : "";
  if (headers.startsWith("Bearer ")) {
    let token = headers.slice(7, headers.length);
    helpers
      .checkToken(token)
      .then(function(result) {
        if (!helpers.isExpired(result)) {
          queries
            .addReview(result.email, req.body)
            .then(function(result) {
              res.json(result);
            })
            .catch(function(reason) {
              res.status(500).json(reason);
            });
        } else {
          res.status(500).json({ error: "Token Expired!" });
        }
      })
      .catch(function(reason) {
        res.status(500).json(reason);
      });
  } else {
    res.json(new Error({ code: "AUT_01", field: "USER-KEY" }).show());
  }
});

module.exports = router;
