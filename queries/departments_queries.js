module.exports = function(connection) {
  let queries = {};

  queries.getDepartments = () => {
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM department', function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  queries.getDepartmentById = (id) => {
    return new Promise(function(resolve, reject) {
      connection.query(`SELECT * FROM department WHERE department_id=${id}`, function(error, results, fields) {
        if(error) reject(error);
        resolve(results);
      });
    });
  };

  return queries;
};
