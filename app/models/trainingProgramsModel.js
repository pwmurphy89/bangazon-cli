const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));
// db.run('PRAGMA foreign_keys = ON');

module.exports.getTrainingPrograms = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM trainingPrograms`, (err, trainingPrograms) => {
      if (err) reject(err);
      resolve(trainingPrograms);
    });
  });
};

module.exports.getTrainingProgramsByEmployee = (id) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM trainingPrograms JOIN employeeTraining ON trainingPrograms.id=employeeTraining.programId AND employeeTraining.employeeId = ${id}`, (err, trainingPrograms) => {
      if (err) reject(err);
      resolve(trainingPrograms);
    });
  });
};
module.exports.getTrainingProgramInfo = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM trainingPrograms WHERE id = ${id}`, (err, trainingProgram) => {
      if (err) reject(err);
      resolve(trainingProgram);
    });
  });
};

module.exports.getOneTrainingProgram = (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM trainingPrograms WHERE id = ${id}`, (err, trainingProgram) => {
        if (err) reject(err);
        resolve(trainingProgram);
      });
    });
};
module.exports.deleteOneTrainingProgram = (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM trainingPrograms WHERE id = ${id}`, (err) => {
        if (err) reject(err);
        resolve({message: "deleted trainingProgram"});
      });
    });
};
module.exports.postTrainingProgram = (trainingProgram) => {
    return new Promise((resolve, reject) => {
        let {title, startDate, endDate, maxAttendees} = trainingProgram
        db.run(`INSERT INTO trainingPrograms (title, startDate, endDate, maxAttendees) VALUES
        ("${title}", "${startDate}", "${endDate}", ${maxAttendees} )`, (err) => {
            if (err) reject(err);
            resolve({message: "added trainingProgram"});
        });
    });
};
module.exports.postEmployeeTraining = (employeeId, programId) => {
  return new Promise((resolve, reject) => {
      db.run(`INSERT INTO employeeTraining (employeeId, programId) VALUES
      (${employeeId}, ${programId} )`, (err) => {
        if (err) reject(err);
        db.get('SELECT * FROM trainingPrograms JOIN employeeTraining ON trainingPrograms.id=employeeTraining.programId AND employeeTraining.id = last_insert_rowid()', (err, trainingProgram) => {
          if (err) reject(err);
          resolve(trainingProgram);
        })
      });
  });
};

module.exports.putTrainingProgram = (trainingProgram, id) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE trainingPrograms SET `;
      let keys = (Object.keys(trainingProgram));
      keys.forEach((key) => {
        query += `"${key}" = "${trainingProgram[key]}",`;
      });
      query = query.slice(0, -1);
      query += ` WHERE id = ${id}`;
      db.run(query, function (err) {
        if (err) reject(err);
        resolve({ message: "updated trainingProgram", rows_updated: this.changes });
      });
    });
  };
