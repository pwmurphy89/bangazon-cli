const faker = require("faker")
const { numbers: {numDepartments, numEmployees} } = require("./numbers.json")

module.exports.buildDepartments = function(){
    let departments = [];
    for(let i=0;i<numDepartments;i++){
       departments.push({
           name: faker.name.jobArea(),
           supervisor: Math.floor(Math.random() * numEmployees) +1,
           budget: faker.commerce.price() * 10
       })
    }
    return departments
}