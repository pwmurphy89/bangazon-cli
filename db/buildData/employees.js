const faker = require("faker")
const { numbers: {numDepartments, numEmployees} } = require("./numbers.json")

module.exports.buildEmployees = function(){
    let employees = [];
    for(let i=0;i<numEmployees;i++){
        employees.push({
            departmentId: Math.floor(Math.random() * numDepartments) + 1,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        })
    }
    return employees
}