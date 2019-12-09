var mysql = require('mysql');
var helpers = require('./helpers');

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true
});
connection.connect();

var departments_queries = require('./queries/departments_queries')(connection);
var categories_queries = require('./queries/categories_queries')(connection);
var attributes_queries = require('./queries/attributes_queries')(connection);
var products_queries = require('./queries/products_queries')(connection);
var customers_queries = require('./queries/customers_queries')(connection);
var orders_queries = require('./queries/orders_queries')(connection);
var shoppingcart_queries = require('./queries/shoppingcart_queries')(connection);
var tax_queries = require('./queries/tax_queries')(connection);
var shipping_queries = require('./queries/shipping_queries')(connection);

module.exports = {
  getDepartments: departments_queries.getDepartments,
  getDepartmentById: departments_queries.getDepartmentById,
  getCategories: categories_queries.getCategories,
  getCategoryById: categories_queries.getCategoryById,
  getCategoryForProduct: categories_queries.getCategoryForProduct,
  getCategoriesFromDepartment: categories_queries.getCategoriesFromDepartment,
  getAttributes: attributes_queries.getAttributes,
  getAttributeById: attributes_queries.getAttributeById,
  getValuesFromAttribute: attributes_queries.getValuesFromAttribute,
  getValuesForProduct: attributes_queries.getValuesForProduct,
  getProducts: products_queries.getProducts,
  getSearchProducts: products_queries.getSearchProducts,
  getProductById: products_queries.getProductById,
  getProductsInACategory: products_queries.getProductsInACategory,
  getProductsInADepartment: products_queries.getProductsInADepartment,
  getReviewsForProduct: products_queries.getReviewsForProduct,
  addReview: products_queries.addReview,
  addUser: customers_queries.addUser,
  loginUser: customers_queries.loginUser,
  getUser: customers_queries.getUser,
  updateUser: customers_queries.updateUser,
  addOrder: orders_queries.addOrder,
  getOrder: orders_queries.getOrder,
  getOrderForACustomer: orders_queries.getOrderForACustomer,
  addProductToCart: shoppingcart_queries.addProductToCart,
  listProductsFromShoppingCart: shoppingcart_queries.listProductsFromShoppingCart,
  updateItem: shoppingcart_queries.updateItem,
  emptyCart: shoppingcart_queries.emptyCart,
  removeProductFromCart: shoppingcart_queries.removeProductFromCart,
  listTaxes: tax_queries.listTaxes,
  getTax: tax_queries.getTax,
  listShippingRegions: shipping_queries.listShippingRegions,
  listShippingsInARegion: shipping_queries.listShippingsInARegion
};
