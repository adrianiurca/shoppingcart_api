module.exports = function(connection) {
  let queries = {};

  queries.addUser = (data) => {
    return new Promise(function(resolve, reject) {
      data.password = helpers.hash(data.password);
      let columns = Object.keys(data).join(', ');
      let values = Object.values(data).map(elem => `'${elem}'`).join(', ');
      connection.query(`INSERT INTO customer (${columns}) VALUES(${values})`, function(error) {
        if(error) reject(error);
        connection.query(`SELECT * FROM customer WHERE email='${data.email}'`, function(error, results, fields) {
          if(error) reject(error);
          delete results[0].password;
          let result = {
            customer : results[0],
            accessToken: helpers.createToken(data.email),
            expiresIn: '1h'
          };
          resolve(results);
        });
      });
    });
  };

  queries.loginUser = (data, forFacebook = false) => {
    return new Promise(function(resolve, reject) {
      if(forFacebook) {
        resolve({
          accessToken: helpers.createToken('facebook'),
          expiresIn: '1h'
        })
      } else {
        let email = data.email;
        let hashedPassword = helpers.hash(data.password);
        console.log(hashedPassword);
        connection.query(`SELECT * FROM customer WHERE email='${email}' AND password='${hashedPassword}'`, function(error, results, fields) {
          if(error) reject(error);
          console.log(results);
          if(results.length == 1) {
            delete results[0].password;
            let result = {
              customer: results[0],
              accessToken: helpers.createToken(email),
              expiresIn: '1h'
            };
            resolve(result);
          } else {
            reject('Wrong username/password combination!');
          }
        });
      }
    });
  };

  queries.getUser = (email) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM customer WHERE email='${email}'`, function(error, results, fields) {
        if(error) reject(error);
        delete results[0].password;
        resolve(results)
      });
    });
  };

  queries.updateUser = (email, data) => {
    let sqlChunk = Object.keys(data).map(element => `${element}=`);
    let values = Object.values(data).map(element => `'${element}'`);
    let index = 0;
    let sql = [];
    sqlChunk.forEach(function(elem) {
      sql.push(elem + values[index++]);
    });
    sql = sql.join(', ');

    return new Promise(function(resolve, reject) {
      connection.query(`UPDATE customer SET ${sql} WHERE email='${email}'`, function(error) {
        if(error) reject(error);
        connection.query(`SELECT * FROM customer WHERE email='${data.email}'`, function(error, results, fields) {
          if(error) reject(error);
          resolve(results);
        });
      });
    });
  };

  return queries;
};
