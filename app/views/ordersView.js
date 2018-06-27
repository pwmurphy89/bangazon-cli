const {postOrder} = require('../models/ordersModel')
const {getProducts, getOneProduct} = require("../models/productsModel")
const {getOneUser} = require("../models/usersModel")
// const {userMenu} = require("../ui")
const {displayProducts} = require("./productsView")
const { getActiveUser } = require("../activeUser");
const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const activeUser = getActiveUser();

console.log("required", displayProducts)

module.exports.placeOrder = function(paymentTypeId, productId){
    let date = new Date();
    postOrder(activeUser.id, productId, date, paymentTypeId)
    .then( (order) => {
        getOneProduct(productId)
        .then((product) => {
            getOneUser(product.userId)
            .then((user) => {
                console.log(`
                Thank you ${activeUser.firstName}!
                ***** ORDER ******
                Product: ${product.title}
                Price: ${product.price}
                Order Date: ${order.orderDate}
                Seller: ${user.firstName} ${user.lastName}
                `);
                console.log(`
                    1. Return to list of products
                    2. Main Menu
                `)

                prompt.get([{
                    name: 'selection',
                    description: 'Please enter choice',
                    type: 'string',
                    required: true
                    }],
                    function(err, input) {
                        switch(input.selection){
                            case "1":
                            displayProducts();
                            break;
                            case "2":
                            userMenu();
                            break;
                        }
                    }
                )
            })
        })
    })
}