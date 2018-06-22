const faker = require("faker")
const {numbers: {numProductTypes} } = require("./numbers.json")

module.exports.buildProductTypes = function(){
    let productTypes = [];
    for(let i=0;i<numProductTypes;i++){
       productTypes.push({
           type: faker.commerce.department()
       })
    }
    return productTypes
}