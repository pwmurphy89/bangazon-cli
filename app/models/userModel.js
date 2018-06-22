'use strict';
// const { Database } = require('sqlite3').verbose();
// const { setActiveCustomer, getActiveCustomer } = require('./activeCustomer');

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'db', 'bangazon.sqlite'));

db.run('PRAGMA foreign_keys = ON');

module.exports.postUser = (user) => {
  return new Promise((resolve, reject) => {
      let {firstName, lastName, accountDate } = user
      db.run(`INSERT INTO users (firstName, lastName, accountDate) VALUES
      ("${firstName}", "${lastName}", "${accountDate}")`, (err) => {
          if (err) reject(err);
          resolve({message: "added user"});
      });
  });
};