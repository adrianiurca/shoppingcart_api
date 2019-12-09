module.exports = function(connection) {
  let queries = {};

  queries.listTaxes = () => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM tax`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.getTax = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM tax WHERE tax_id=${id}`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  return queries;
};
