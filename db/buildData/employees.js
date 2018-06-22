const faker = require("faker")
const { numbers: {numDepartments, numEmployees} } = require("./numbers.json")

module.exports.buildEmployees = function(){
    let employees = [];
    for(let i=0;i<numEmployees;i++){
        employees.push({
            departmentId: faker.random.number({
                'min': 1,
                'max': numDepartments
            }),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: "password"
        })
    }
    return employees
}