'use strict';

require('dotenv').config();

const db = require('mysql').createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // debug: ['ComQueryPacket', 'RowDataPacket'],
});

db.connect((err) => {
  if (err) throw err;
});

db.config.queryFormat = function(query, values) {
  if (!values) return query;
  return query.replace(/:(\w+)/g, function(txt, key) {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};

module.exports = db;
