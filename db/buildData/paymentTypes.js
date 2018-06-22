const faker = require("faker")
const {numbers: {numPaymentTypes, numUsers} } = require("./numbers.json")

module.exports.buildPaymentTypes = function(){
    let paymentTypes = [];
    for(let i=0;i<numPaymentTypes;i++){
       paymentTypes.push({
           userId: faker.random.number({
                'min': 1,
                'max': numUsers
            }),
           type: faker.finance.accountName(),
           accountNumber: faker.finance.account(),
       })
    }
    return paymentTypes
}