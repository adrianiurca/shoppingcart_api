var common = require('./../common');
var assert = common.assert;
var chai = common.chai;
var should = common.should;
var server = common.server;

it('should list all departments', done => {
  console.log('listing all departments');
  chai.request(server).get('/departments/').send().end((error, response) => {
    response.should.have.status(200);
    console.log('Response body: ', response.body);
    done();
  });
});

it('should display the required department', done => {
  let department_id = 1;
  console.log(`display department[${department_id}]`);
  chai.request(server).get(`/departments/${department_id}`).send().end((error, response) => {
    response.should.have.status(200);
    console.log('Response body: ', response.body);
    done();
  });
});
