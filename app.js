var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var cors = require("cors");
dotenv.config();

var departments = require("./routes/departments");
var categories = require("./routes/categories");
var attributes = require("./routes/attributes");
var products = require("./routes/products");
var customers = require("./routes/customers");
var updateCustomer = require("./routes/update_customer");
var orders = require("./routes/orders");
var shoppingcart = require("./routes/shoppingcart");
var tax = require("./routes/tax");
var shipping = require("./routes/shipping");
var stripe = require("./routes/stripe");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use("/departments", departments);
app.use("/categories", categories);
app.use("/attributes", attributes);
app.use("/products", products);
app.use("/customers", customers);
app.use("/customer", updateCustomer);
app.use("/orders", orders);
app.use("/shoppingcart", shoppingcart);
app.use("/tax", tax);
app.use("/shipping", shipping);
app.use("/stripe", stripe);

module.exports = app;
