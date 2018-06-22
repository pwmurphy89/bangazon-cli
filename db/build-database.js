const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');

// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const db = new sqlite3.Database(path.join(__dirname,'bangazon.sqlite'));


const {buildComputers} = require("./buildData/computers")
const {buildDepartments} = require("./buildData/departments")
const {buildEmployees} = require("./buildData/employees")
const {buildTrainingPrograms} = require("./buildData/trainingPrograms")
const {buildEmployeeTraining} = require("./buildData/employeeTraining")
const {buildUsers} = require("./buildData/users")
const {buildPaymentTypes} = require("./buildData/paymentTypes")
const {buildOrders} = require("./buildData/orders")
const {buildProductTypes} = require("./buildData/productTypes")
const {buildProducts} = require("./buildData/products")

const computers = buildComputers()
const departments = buildDepartments()
const employees = buildEmployees()
const trainingPrograms = buildTrainingPrograms()
const employeeTraining = buildEmployeeTraining(trainingPrograms)
const users = buildUsers()
const paymentTypes = buildPaymentTypes()
const orders = buildOrders()
const productTypes = buildProductTypes()
const products = buildProducts()

db.serialize(function () {

    db.run(`DROP TABLE IF EXISTS employees`)
    db.run(`CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY,
        departmentId INT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL)`
    )
    employees.forEach(({ departmentId, firstName, lastName }) => {
        db.run(`INSERT INTO employees (departmentId, firstName, lastName)
                VALUES (${departmentId}, "${firstName}", "${lastName}")`);
    });

    db.run(`DROP TABLE IF EXISTS departments`)
    db.run(`CREATE TABLE IF NOT EXISTS departments (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        supervisor INT NOT NULL,
        budget INT NOT NULL)`
    )
    departments.forEach(({ name, supervisor, budget }) => {
        db.run(`INSERT INTO departments (name, supervisor, budget)
                  VALUES ("${name}", ${supervisor}, ${budget})`);
        });

    db.run(`DROP TABLE IF EXISTS computers`)
    db.run(`CREATE TABLE IF NOT EXISTS computers (
        id INTEGER PRIMARY KEY,
        employeeId INT,
        purchaseDate TEXT NOT NULL,
        decommissionDate TEXT,
        FOREIGN KEY(employeeId) REFERENCES employees(id))`
    )
    computers.forEach(({ purchaseDate, decommissionDate}) => {
        db.run(`INSERT INTO computers (purchaseDate, decommissionDate)
                VALUES ("${purchaseDate}", "${decommissionDate}")`);
        });

    db.run(`DROP TABLE IF EXISTS trainingPrograms`)
    db.run(`CREATE TABLE IF NOT EXISTS trainingPrograms (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT NOT NULL,
        maxAttendees INT NOT NULL)`
    )
    trainingPrograms.forEach(({ title, startDate, endDate, maxAttendees}) => {
        db.run(`INSERT INTO trainingPrograms (title, startDate, endDate, maxAttendees)
                VALUES ("${title}", "${startDate}", "${endDate}", ${maxAttendees})`);
        });

    db.run(`DROP TABLE IF EXISTS employeeTraining`)
    db.run(`CREATE TABLE IF NOT EXISTS employeeTraining (
        id INTEGER PRIMARY KEY,
        employeeId INT NOT NULL,
        programId INT NOT NULL,
        FOREIGN KEY(employeeId) REFERENCES employees(id))`
    )
    employeeTraining.forEach(({ employeeId, programId}) => {
        db.run(`INSERT INTO employeeTraining (employeeId, programId)
                VALUES (${employeeId}, ${programId})`);
        });

    db.run(`DROP TABLE IF EXISTS users`)
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        accountDate TEXT NOT NULL,
        password TEXT NOT NULL)`
    )
    users.forEach(({ firstName, lastName, accountDate, password}) => {
        db.run(`INSERT INTO users (firstName, lastName, accountDate, password)
                VALUES ("${firstName}", "${lastName}", "${accountDate}", "${password}")`);
        });

    db.run(`DROP TABLE IF EXISTS paymentTypes`)
    db.run(`CREATE TABLE IF NOT EXISTS paymentTypes (
        id INTEGER PRIMARY KEY,
        customerId INT NOT NULL,
        type TEXT NOT NULL,
        accountNumber INT NOT NULL,
        FOREIGN KEY(customerId) REFERENCES users(id))`
    )
    paymentTypes.forEach(({ customerId, type, accountNumber}) => {
        db.run(`INSERT INTO paymentTypes (customerId, type, accountNumber)
                VALUES (${customerId}, "${type}", ${accountNumber})`);
        });

    db.run(`DROP TABLE IF EXISTS orders`)
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        customerId INT NOT NULL,
        productId INT NOT NULL,
        orderDate TEXT NOT NULL,
        paymentTypeId INT,
        FOREIGN KEY(customerId) REFERENCES users(id),
        FOREIGN KEY(productId) REFERENCES products(id),
        FOREIGN KEY(paymentTypeId) REFERENCES paymentTypes(id))`
    )
    orders.forEach(({ customerId, productId, orderDate, paymentTypeId}) => {
        db.run(`INSERT INTO orders (customerId, productId, orderDate, paymentTypeId)
                VALUES (${customerId}, ${productId}, "${orderDate}", ${paymentTypeId})`);
        });

    db.run(`DROP TABLE IF EXISTS productTypes`)
    db.run(`CREATE TABLE IF NOT EXISTS productTypes (
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL)`
    )
    productTypes.forEach(({ type }) => {
        db.run(`INSERT INTO productTypes (type)
                VALUES ("${type}")`);
        });

    db.run(`DROP TABLE IF EXISTS products`)
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        productTypeId INT NOT NULL,
        price INT NOT NULL,
        title TEXT NOT NULL,
        userId INT NOT NULL,
        FOREIGN KEY(productTypeId) REFERENCES productTypes(id),
        FOREIGN KEY(userId) REFERENCES users(id))`
    )
    products.forEach(({ productTypeId, price, title, description, userId}) => {
        db.run(`INSERT INTO products (productTypeId, price, title, userId)
                VALUES (${productTypeId}, ${price}, "${title}", ${userId})`);
        });
})