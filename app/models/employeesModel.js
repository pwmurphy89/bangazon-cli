const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));
// db.run('PRAGMA foreign_keys = ON');

module.exports.getEmployees = () => {
  console.log("getting into here")
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM employees`, (err, employees) => {
      if (err) reject(err);
      resolve(employees);
    });
  });
};

module.exports.getOneEmployee = (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM employees WHERE id = ${id}`, (err, employee) => {
        if (err) reject(err);
        resolve(employee);
      });
    });
};
module.exports.postEmployee = (employee) => {
    return new Promise((resolve, reject) => {
        let {purchaseDate, decommissionDate } = employee
        db.run(`INSERT INTO employees (departmentId, firstName, lastName ) VALUES
        (${departmentId}, "${firstName}", "${lastName}")`, (err) => {
            if (err) reject(err);
            resolve({message: "added employee"});
        });
    });
};
module.exports.putEmployee = (employee, id) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE employees SET `;
      let keys = (Object.keys(employee));
      keys.forEach((key) => {
        query += `"${key}" = "${employee[key]}",`;
      });
      query = query.slice(0, -1);
      query += ` WHERE id = ${id}`;
      db.run(query, function (err) {
        if (err) reject(err);
        resolve({ message: "updated employee", rows_updated: this.changes });
      });
    });
  };
