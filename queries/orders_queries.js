module.exports = function(connection) {
  let queries = {};

  queries.addOrder = (data) => {
    let columns = Object.keys(data).join(', ');
    let values = Object.values(data).join(', ');
    return new Promise(function(resolve, reject) {
      connection.query(`INSERT INTO orders (${columns}) VAlUES(${values})`, function(error) {
        if(error) reject(error);
        connection.query(`SELECT order_id FROM orders WHERE shipping_id=${data.shipping_id} AND tax_id=${data.tax_id}`,
          function(error, results, fileds) {
          if(error) reject(error);
          resolve(results);
        });
      });
    });
  };

  queries.getOrder = (id, shortDetail = false) => {
    return new Promise(function(resolve, reject) {
      let sqlChunk = '*';
      if(shortDetail) {
        sqlChunk = 'order_id, total_amount, created_on, shipped_on, status, name';
      }
      connection.query(`SELECT ${sqlChunk} FROM order_detail WHERE order_id=${id}`, function(error, results, fields) {
        if(error) reject(error);
        if(shortDetail) {
          resolve(results[0]);
        } else {
          results.forEach(function(result) {
            delete result.item_id;
            delete result.order_id;
            result.subtotal = result.quantity * result.unit_cost;
          });
          let result = {
            order_id: id,
            order_items: results
          };
          resolve(result);
        }
      });
    });
  };

  queries.getOrderForACustomer = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM orders WHERE customer_id=${id}`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  return queries;
};
