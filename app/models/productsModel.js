const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));
db.run('PRAGMA foreign_keys = ON');

module.exports.getProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products`, (err, products) => {
      if (err) reject(err);
      resolve(products);
    });
  });
};
module.exports.getProductsByUser = (id) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products where userId = ${id}`, (err, products) => {
      if (err) reject(err);
      resolve(products);
    });
  });
};
module.exports.getProductByUserAndTitle = (id, title) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM products where userId = ${id} AND title = "${title}"`, (err, product) => {
      if (err) reject(err);
      resolve(product);
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
module.exports.postProduct = (productTypeId, price, title, userId) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO products (productTypeId, price, title, userId) VALUES
        (${productTypeId}, ${price}, "${title}", ${userId})`, (err) => {
            if (err) reject(err);
            db.get('SELECT * FROM products WHERE id = last_insert_rowid()', (err, product) => {
              if (err) reject(err);
              resolve(product);
            })
        });
    });
};

module.exports.putProduct = (product) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE products SET `;
      let keys = (Object.keys(product));
      keys.forEach((key) => {
        query += `"${key}" = "${product[key]}",`;
      });
      query = query.slice(0, -1);
      query += ` WHERE id = ${product.id}`;
      db.run(query, function (err) {
        if (err) reject(err);
        db.get(`SELECT * FROM products WHERE id = ${product.id}`, (err, product) => {
          if (err) reject(err);
          resolve(product);
        })
      });
    });
  };
