module.exports = function(connection) {
  let queries = {};

  queries.getAttributes = () => {
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM attribute', function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.getAttributeById = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM attribute WHERE attribute_id=${id}`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.getValuesFromAttribute = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT attribute_value_id, value FROM attribute_value WHERE attribute_id=${id}`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.getValuesForProduct = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM attribute_value WHERE attribute_value_id=ANY(SELECT attribute_value_id FROM product_attribute WHERE product_id=${id})`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  return queries;
};
