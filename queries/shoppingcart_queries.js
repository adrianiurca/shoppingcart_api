module.exports = function(connection) {
  let queries = {};

  queries.addProductToCart = (data) => {
    let columns = Object.keys(data).join(', ');
    let values = Object.values(data).map(element => `'${element}'`).join(', ');
    return new Promise(function(resolve, reject) {
      connection.query(`INSERT INTO shopping_cart (${columns}) VALUES(${values})`, function(error) {
        if(error) reject(error);
        connection.query(`SELECT * FROM shopping_cart WHERE cart_id='${data.cart_id}' AND product_id=${data.product_id}`,
          function(error, result, fields) {
          if(error) reject(error);
          resolve(results[0]);
        });
      });
    });
  };

  queries.listProductsFromShoppingCart = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT a.*, b* FROM shopping_cart a, product b WHERE a.product_id=b.product_id AND a.cart_id=${id}`,
        function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.updateItem = (id, data) => {
    return new Promise(function(resolve, reject) {
      connection.query(`UPDATE shopping_cart SET quantity=${data.quantity} WHERE a.cart_id=${id}`,
        function(error) {
        if(error) reject(error);
        connection.query(`SELECT * FROM shopping_cart WHERE cart_id='${data.cart_id}'`, function(error, result, fields) {
          if(error) reject(error);
          resolve(results[0]);
        });
      });
    });
  };

  queries.emptyCart = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`DELETE FROM shopping_cart WHERE cart_id=${id}`, function(error) {
        if(error) reject(error);
        resolve([]);
      });
    });
  };

  queries.removeProductFromCart = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`DELETE FROM shopping_cart WHERE item_id=${id}`, function(error) {
        if(error) reject(error);
        resolve({message: 'The product was successfuly removed from the cart'});
      });
    });
  };

  return queries;
};
