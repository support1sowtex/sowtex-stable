// lib/knex.js
const knex = require('knex');
const config = require('../knexfile');

// Initialize knex with the development configuration
const db = knex(config.development);

// Export the knex instance
module.exports = db;