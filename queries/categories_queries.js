module.exports = function(connection) {
  let queries = {};

  queries.getCategories = () => {
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM category', function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.getCategoryById = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM category WHERE category_id=${id}`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.getCategoryForProduct = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM category WHERE category_id=ANY(SELECT category_id FROM product_category WHERE product_id=${id})`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.getCategoriesFromDepartment = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM category WHERE department_id=${id}`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  return queries;
};
