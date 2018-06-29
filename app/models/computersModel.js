const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));
db.run('PRAGMA foreign_keys = ON');

module.exports.getComputers = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM computers`, (err, computers) => {
      if (err) reject(err);
      resolve(computers);
    });
  });
};

module.exports.getOneComputer = (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM computers WHERE id = ${id}`, (err, computer) => {
        if (err) reject(err);
        resolve(computer);
      });
    });
};
module.exports.getEmployeeComputer = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM computers JOIN employees ON computers.employeeId=employees.id AND employees.id = ${id}`, (err, computer) => {
      if (err) reject(err);
      resolve(computer);
    });
  });
};

module.exports.deleteOneComputer = (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM computers WHERE id = ${id}`, (err) => {
        if (err) reject(err);
        resolve({message: "deleted computer"});
      });
    });
};
module.exports.postComputer = (computer) => {
    return new Promise((resolve, reject) => {
        let {purchaseDate, decommissionDate } = computer
        db.run(`INSERT INTO computers (purchaseDate, decommissionDate) VALUES
        ("${purchaseDate}", "${decommissionDate}")`, (err) => {
            if (err) reject(err);
            resolve({message: "added computer"});
        });
    });
};
module.exports.putComputer = (computer, id) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE computers SET `;
      let keys = (Object.keys(computer));
      keys.forEach((key) => {
        query += `"${key}" = "${computer[key]}",`;
      });
      query = query.slice(0, -1);
      query += ` WHERE id = ${id}`;
      db.run(query, function (err) {
        if (err) reject(err);
        resolve({ message: "updated computer", rows_updated: this.changes });
      });
    });
  };
