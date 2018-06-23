const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));
db.run('PRAGMA foreign_keys = ON');

module.exports.getDepartments = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM departments`, (err, departments) => {
      if (err) reject(err);
      resolve(departments);
    });
  });
};

module.exports.getOneDepartment = (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM departments WHERE id = ${id}`, (err, department) => {
        if (err) reject(err);
        resolve(department);
      });
    });
};
module.exports.deleteOneDepartment = (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM departments WHERE id = ${id}`, (err) => {
        if (err) reject(err);
        resolve({message: "deleted department"});
      });
    });
};
module.exports.postDepartment = (department) => {
    return new Promise((resolve, reject) => {
        let {name, supervisor, budget } = department
        db.run(`INSERT INTO departments (name, supervisor, budget) VALUES
        ("${name}", ${supervisor}, ${budget})`, (err) => {
            if (err) reject(err);
            resolve({message: "added department"});
        });
    });
};
module.exports.putDepartment = (department, id) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE departments SET `;
      let keys = (Object.keys(department));
      keys.forEach((key) => {
        query += `"${key}" = "${department[key]}",`;
      });
      query = query.slice(0, -1);
      query += ` WHERE id = ${id}`;
      db.run(query, function (err) {
        if (err) reject(err);
        resolve({ message: "updated department", rows_updated: this.changes });
      });
    });
  };
