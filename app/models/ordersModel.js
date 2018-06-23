const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));
db.run('PRAGMA foreign_keys = ON');

module.exports.getOrders = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM orders`, (err, orders) => {
      if (err) reject(err);
      resolve(orders);
    });
  });
};
module.exports.getOneOrder = (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM orders WHERE id = ${id}`, (err, order) => {
        if (err) reject(err);
        resolve(order);
      });
    });
};
module.exports.deleteOneOrder = (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM orders WHERE id = ${id}`, (err) => {
        if (err) reject(err);
        resolve({message: "deleted order"});
      });
    });
};
module.exports.postOrder = (order) => {
    return new Promise((resolve, reject) => {
        let {customerId, productId, orderDate, paymentTypeId } = order
        db.run(`INSERT INTO orders (customerId, productId, orderDate, paymentTypeId) VALUES
        (${customerId}, ${productId}, "${orderDate}", ${paymentTypeId})`, (err) => {
            if (err) reject(err);
            resolve({message: "added order"});
        });
    });
};
module.exports.putOrder = (order, id) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE orders SET `;
      let keys = (Object.keys(order));
      keys.forEach((key) => {
        query += `"${key}" = "${order[key]}",`;
      });
      query = query.slice(0, -1);
      query += ` WHERE id = ${id}`;
      db.run(query, function (err) {
        if (err) reject(err);
        resolve({ message: "updated order", rows_updated: this.changes });
      });
    });
  };
