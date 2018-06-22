const faker = require("faker")
const {numbers: {numOrders, numUsers, numProducts} } = require("./numbers.json")

module.exports.buildOrders = function(){
    let orders = [];
    for(let i=0;i<numOrders;i++){
       orders.push({
           customerId: faker.random.number(numUsers),
           productId: faker.random.number(numProducts),
           orderDate: faker.date.past().toDateString(),
           paymentTypeId: null
       })
    }
    return orders
}