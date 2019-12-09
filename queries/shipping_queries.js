module.exports = function(connection) {
  let queries = {};

  queries.listShippingRegions = () => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM shipping_region`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.listShippingsInARegion = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM shipping WHERE shipping_region_id=${id}`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  return queries;
};
