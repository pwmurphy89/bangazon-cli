const faker = require("faker")
const {numbers: {numProducts, numProductTypes, numUsers} } = require("./numbers.json")

module.exports.buildProducts = function(){
    let products = [];
    for(let i=0;i<numProducts;i++){
       products.push({
           productTypeId: faker.random.number({
                'min': 1,
                'max': numProductTypes
            }),
           price: faker.commerce.price() / 10,
           title: faker.commerce.productName(),
           userId: faker.random.number({
                'min': 1,
                'max': numUsers
            })
       })
    }
    return products
}