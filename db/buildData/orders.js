const faker = require("faker")
const {numbers: {numOrders, numUsers, numProducts, numPaymentTypes} } = require("./numbers.json")

module.exports.buildOrders = function(){
    let orders = [];
    for(let i=0;i<numOrders;i++){
       orders.push({
           userId: faker.random.number({
                'min': 1,
                'max': numUsers
            }),
           productId: faker.random.number({
                'min': 1,
                'max': numProducts
            }),
           orderDate: faker.date.past(),
           paymentTypeId: faker.random.number({
               'min': 1,
               'max': numPaymentTypes
           })
       })
    }
    return orders
}