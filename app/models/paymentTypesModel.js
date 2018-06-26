const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));
db.run('PRAGMA foreign_keys = ON');

module.exports.getUserPaymentTypes = (id) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM paymentTypes WHERE userId = ${id}`, (err, paymentTypes) => {
        if (err) reject(err);
        resolve(paymentTypes);
      });
    });
};

module.exports.getOnePaymentType = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM paymentTypes where id =${id}`, (err, paymentType) => {
      if (err) reject(err);
      resolve(paymentType);
    });
  });
};

module.exports.postPaymentType = (userId, type, accountNumber) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO paymentTypes (userId, type, accountNumber) VALUES
        (${userId}, "${type}", ${accountNumber})`, (err) => {
            if (err) reject(err);
            db.get('SELECT * FROM paymentTypes WHERE id = last_insert_rowid()', (err, paymentType) => {
              if (err) reject(err);
              resolve(paymentType);
            })
        });
    });
};

module.exports.deleteOnePaymentType = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM paymentTypes WHERE userId = ${id}`, (err) => {
      if (err) reject(err);
      resolve({message: "deleted paymentType"});
    });
  });
};

module.exports.putPaymentType = (paymentType, id) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE paymentTypes SET `;
      let keys = (Object.keys(paymentType));
      keys.forEach((key) => {
        query += `"${key}" = "${paymentType[key]}",`;
      });
      query = query.slice(0, -1);
      query += ` WHERE id = ${id}`;
      db.run(query, function (err) {
        if (err) reject(err);
        resolve({ message: "updated paymentType", rows_updated: this.changes });
      });
    });
  };
