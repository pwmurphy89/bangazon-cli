const {postOrder, getUserOrders} = require('../models/ordersModel')
const {getProducts, getOneProduct, getProductsByUser} = require("../models/productsModel")
const {getOneUser, getUserByLastName} = require("../models/usersModel")
const ui = require("../ui")
const displayProducts = require("./productsView")
const { getActiveUser } = require("../activeUser");
const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const activeUser = getActiveUser();

exports.viewOrders = function(userId){
        getUserOrders(userId)
        .then((orders)=> {
            let count = 1;
            let num = 0;
            console.log(`******** ORDERS *********`)
            orders.forEach(order => {
                getOneProduct(order.productId)
                .then((product) => {
                    getOneUser(product.userId)
                    .then((user) => {
                        num++;
                        console.log(`
                            ${count++}: ${product.title}
                            Price: ${product.price}
                            Order Date: ${order.orderDate}
                            Seller: ${user.firstName} ${user.lastName}
                        `)
                        if(num == orders.length){
                            sellerInfoHandler();
                        }
                    })
                })

            });
        })
}

const sellerInfoHandler = function(){
    console.log(`
            1. Return to main menu
            2. Seller Information
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
            ui.userMenu();
            break;
            case "2":
            prompt.get([{
                name: 'sellerName',
                description: 'Please enter seller last name',
                type: 'string',
                required: true
                }], sellerInfo)
            break;
        }
    }
    )
  }

const sellerInfo = function(err, input) {
    getUserByLastName(input.sellerName)
    .then((seller) => {
        console.log(`
        ${seller.firstName} ${seller.lastName}
        Member since: ${seller.accountDate}
        `)
        getProductsByUser(seller.id)
        .then ((products) => {
            console.log("******* Products sold by this user ********")
            let count = 1;
            products.forEach(product => {
                console.log(`
                    ${count++} ${product.title}
                    Price: ${product.price}
                `)
            })
            console.log(`
            1. Return to main menu
            2. Back to list of Orders
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
                    ui.userMenu();
                    break;
                    case "2":
                    exports.viewOrders(activeUser.id);
                    break;
                }
            }
            )
        })
    })
}

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
                            displayProducts.displayProducts();
                            break;
                            case "2":
                            ui.userMenu();
                            break;
                        }
                    }
                )
            })
        })
    })
}