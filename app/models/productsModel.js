const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'db', 'bangazon.sqlite'));
db.run('PRAGMA foreign_keys = ON');

module.exports.getProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products`, (err, products) => {
      if (err) reject(err);
      resolve(products);
    });
  });
};
module.exports.getOneProduct = (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM products WHERE id = ${id}`, (err, product) => {
        if (err) reject(err);
        resolve(product);
      });
    });
};
module.exports.deleteOneProduct = (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM products WHERE id = ${id}`, (err) => {
        if (err) reject(err);
        resolve({message: "deleted product"});
      });
    });
};
module.exports.postProduct = (product) => {
    return new Promise((resolve, reject) => {
        let {productTypeId, price, title, description, userId} = product
        db.run(`INSERT INTO products (productTypeId, price, title, description, userId) VALUES
        (${productTypeId}, ${price}, "${description}", ${userId})`, (err) => {
            if (err) reject(err);
            resolve({message: "added product"});
        });
    });
};
module.exports.putProduct = (product, id) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE products SET `;
      let keys = (Object.keys(product));
      keys.forEach((key) => {
        query += `"${key}" = "${product[key]}",`;
      });
      query = query.slice(0, -1);
      query += ` WHERE id = ${id}`;
      db.run(query, function (err) {
        if (err) reject(err);
        resolve({ message: "updated product", rows_updated: this.changes });
      });
    });
  };
