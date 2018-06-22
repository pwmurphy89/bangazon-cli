const faker = require("faker")
const {numbers: {numPaymentTypes, numUsers} } = require("./numbers.json")

module.exports.buildPaymentTypes = function(){
    let paymentTypes = [];
    for(let i=0;i<numPaymentTypes;i++){
       paymentTypes.push({
           customerId: faker.random.number(numUsers),
           type: faker.finance.accountName(),
           accountNumber: faker.finance.account(),
       })
    }
    return paymentTypes
}