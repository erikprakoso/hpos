const dbConfig = require('../../config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {}
db.mongoose = mongoose;
db.url = dbConfig.url;
db.categories = require('./category.model')(mongoose)
db.customers = require('./customer.model')(mongoose)
db.users = require('./user.model')(mongoose)
db.orders = require('./order.model')(mongoose)
db.products = require('./product.model')(mongoose)

module.exports = db;