const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'db', 'bangazon.sqlite'));
db.run('PRAGMA foreign_keys = ON');

module.exports.getPaymentTypes = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM paymentTypes`, (err, paymentTypes) => {
      if (err) reject(err);
      resolve(paymentTypes);
    });
  });
};

module.exports.getOnePaymentType = (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM paymentTypes WHERE id = ${id}`, (err, paymentType) => {
        if (err) reject(err);
        resolve(paymentType);
      });
    });
};
module.exports.deleteOnePaymentType = (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM paymentTypes WHERE id = ${id}`, (err) => {
        if (err) reject(err);
        resolve({message: "deleted paymentType"});
      });
    });
};
module.exports.postPaymentType = (paymentType) => {
    return new Promise((resolve, reject) => {
        let {customerId, type, accountNumber } = paymentType
        db.run(`INSERT INTO paymentTypes (customerId, type, accountNumber) VALUES
        (${customerId}, "${type}", ${accountNumber})`, (err) => {
            if (err) reject(err);
            resolve({message: "added paymentType"});
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
