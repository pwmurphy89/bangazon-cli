const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));
db.run('PRAGMA foreign_keys = ON');

module.exports.getProductTypes = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM productTypes`, (err, productTypes) => {
      if (err) reject(err);
      resolve(productTypes);
    });
  });
};
module.exports.getOneProductType = (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM productTypes WHERE id = ${id}`, (err, productType) => {
        if (err) reject(err);
        resolve(productType);
      });
    });
};
module.exports.deleteOneProductType = (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM productTypes WHERE id = ${id}`, (err) => {
        if (err) reject(err);
        resolve({message: "deleted productType"});
      });
    });
};
module.exports.postProductType = (productType) => {
    return new Promise((resolve, reject) => {
        let {type} = productType
        db.run(`INSERT INTO productTypes (type) VALUES
        ("${type}")`, (err) => {
            if (err) reject(err);
            resolve({message: "added productType"});
        });
    });
};
module.exports.putProductType = (productType, id) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE productTypes SET `;
      let keys = (Object.keys(productType));
      keys.forEach((key) => {
        query += `"${key}" = "${productType[key]}",`;
      });
      query = query.slice(0, -1);
      query += ` WHERE id = ${id}`;
      db.run(query, function (err) {
        if (err) reject(err);
        resolve({ message: "updated productType", rows_updated: this.changes });
      });
    });
  };
