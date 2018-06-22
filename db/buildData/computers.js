const faker = require("faker")
const {numbers: {numComputers} } = require("./numbers.json")

module.exports.buildComputers = function(){
    let computers = [];
    for(let i=0;i<numComputers;i++){
       computers.push({
           employeeId: i + 1,
           purchaseDate: faker.date.past().toDateString(),
           decommissionDate: faker.date.future().toDateString()
       })
    }
    return computers
}