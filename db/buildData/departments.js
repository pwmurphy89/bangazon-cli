const faker = require("faker")
const { numbers: {numDepartments, numEmployees} } = require("./numbers.json")

module.exports.buildDepartments = function(){
    let departments = [];
    for(let i=0;i<numDepartments;i++){
       departments.push({
           name: faker.name.jobArea(),
           supervisor: faker.random.number({
                'min': 1,
                'max': numEmployees
            }),
           budget: faker.commerce.price() * 10
       })
    }
    return departments
}