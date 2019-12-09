var assert = require('assert');
var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('./../app');

var should = chai.should();
chai.use(chaiHTTP);

module.exports = {
  assert: assert,
  chai: chai,
  should: should,
  server: server
};
