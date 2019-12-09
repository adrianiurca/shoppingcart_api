module.exports = function(connection) {
  let queries = {};

  queries.getProducts = params => {
    return new Promise(function(resolve, reject) {
      connection.query(
        `SELECT SQL_CALC_FOUND_ROWS product_id, name, LEFT(description, ${
          params.description_length
        }), price, discounted_price, thumbnail FROM product LIMIT ${(params.page -
          1) *
          params.limit}, ${params.limit}`,
        function(error, results, fields) {
          if (error) reject(error);
          connection.query("SELECT FOUND_ROWS()", function(
            error,
            rowsNumber,
            fields
          ) {
            if (error) reject(error);
            let result = {
              paginationMeta: {
                currentPage: params.page,
                currentPageSize: results.length,
                totalPages: Math.ceil(
                  rowsNumber[0]["FOUND_ROWS()"] / results.length
                ),
                totalRecords: rowsNumber[0]["FOUND_ROWS()"]
              },
              rows: results
            };
            resolve(result);
          });
        }
      );
    });
  };

  queries.getSearchProducts = params => {
    return new Promise(function(resolve, reject) {
      let sqlChunk = "";
      if (
        typeof params.all_words === "undefined" ||
        params.all_words === "off" ||
        params.all_words === ""
      ) {
        if (
          (typeof params.query_string === "undefined") |
          (params.query_string === "")
        ) {
          sqlChunk = "";
        } else {
          sqlChunk = `WHERE name LIKE ('${params.query_string}%')`;
        }
      } else {
        if (params.all_words === "on") {
          if (
            (typeof params.query_string === "undefined") |
            (params.query_string === "")
          ) {
            sqlChunk = "";
          } else {
            let tags = params.query_string
              .split(" ")
              .map(element => `LIKE '%${element}%'`)
              .join("OR description ");
            sqlChunk = `WHERE description ${tags}`;
          }
        }
      }
      connection.query(
        `SELECT SQL_CALC_FOUND_ROWS product_id, name, LEFT(description, ${
          params.description_length
        }), price, discounted_price, thumbnail FROM product ${sqlChunk} LIMIT ${(params.page -
          1) *
          params.limit}, ${params.limit}`,
        function(error, results, fields) {
          if (error) reject(error);
          connection.query("SELECT FOUND_ROWS()", function(
            error,
            rowsNumber,
            fields
          ) {
            if (error) reject(error);
            let result = {
              paginationMeta: {
                currentPage: params.page,
                currentPageSize: results.length,
                totalPages: Math.ceil(
                  rowsNumber[0]["FOUND_ROWS()"] / results.length
                ),
                totalRecords: rowsNumber[0]["FOUND_ROWS()"]
              },
              rows: results
            };
            resolve(result);
          });
        }
      );
    });
  };

  queries.getProductById = params => {
    return new Promise(function(resolve, reject) {
      connection.query(
        `SELECT product_id, name, LEFT(description, ${params.description_length}) AS description, price, discounted_price, thumbnail, display FROM product WHERE product_id=${params.id}`,
        function(error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  };

  queries.getProductsInACategory = params => {
    return new Promise(function(resolve, reject) {
      connection.query(
        `SELECT SQL_CALC_FOUND_ROWS product_id, name, LEFT(description, ${
          params.description_length
        }), price, discounted_price FROM product WHERE product_id=ANY(SELECT product_id FROM product_category WHERE category_id=${
          params.id
        }) LIMIT ${(params.page - 1) * params.limit}, ${params.limit}`,
        function(error, results, fields) {
          if (error) reject(error);
          connection.query("SELECT FOUND_ROWS()", function(
            error,
            rowsNumber,
            fields
          ) {
            let result = {
              paginationMeta: {
                currentPage: params.page,
                currentPageSize: results.length,
                totalPages: Math.ceil(
                  rowsNumber[0]["FOUND_ROWS()"] / results.length
                ),
                totalRecords: rowsNumber[0]["FOUND_ROWS()"]
              },
              rows: results
            };
            resolve(result);
          });
        }
      );
    });
  };

  queries.getProductsInADepartment = params => {
    return new Promise(function(resolve, reject) {
      connection.query(
        `SELECT SQL_CALC_FOUND_ROWS product_id, name, LEFT(description, ${
          params.description_length
        }), price, discounted_price, thumbnail FROM product WHERE product_id=ANY(SELECT product_id FROM product_category WHERE category_id=ANY(SELECT category_id FROM category WHERE department_id=${
          params.id
        })) LIMIT ${(params.page - 1) * params.limit}, ${params.limit}`,
        function(error, results, fields) {
          if (error) reject(error);
          connection.query("SELECT FOUND_ROWS()", function(
            error,
            rowsNumber,
            fields
          ) {
            let result = {
              paginationMeta: {
                currentPage: params.page,
                currentPageSize: results.length,
                totalPages: Math.ceil(
                  rowsNumber[0]["FOUND_ROWS()"] / results.length
                ),
                totalRecords: rowsNumber[0]["FOUND_ROWS()"]
              },
              rows: results
            };
            resolve(result);
          });
        }
      );
    });
  };

  queries.getReviewsForProduct = id => {
    return new Promise(function(resolve, reject) {
      connection.query(
        `SELECT a.name, b.review, b.rating, b.created_on FROM customer a, review b WHERE a.customer_id=b.customer_id AND b.product_id=${id}`,
        function(error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  };

  queries.addReview = (email, data) => {
    return new Promise(function(resolve, reject) {
      connection.query(
        `SELECT customer_id FROM customer WHERE email=${email}`,
        function(error, rowCustomerId, fields) {
          if (error) reject(error);
          connection.query(
            `INSERT INTO review (product_id, review, rating, customer_id, created_on) VALUES(${
              data.product_id
            }, ${data.review}, ${rowCustomerId[0].customer_id}, ${Date.now()})`,
            function(error, results, fields) {
              if (error) reject(error);
              resolve(results);
            }
          );
        }
      );
    });
  };

  return queries;
};
