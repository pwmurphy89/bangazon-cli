
const {getProducts, getOneProduct, postProduct, getProductsByUser, putProduct, getProductByUserAndTitle } = require("../models/productsModel")
const {getProductTypes, getProductTypeByName} = require("../models/productTypesModel")
const { getActiveUser } = require("../activeUser");
const {red, magenta, blue} = require("chalk");
const {showPaymentTypes} = require("./paymentTypesView")
const ui = require('../ui')
const prompt = require('prompt');
const activeUser = getActiveUser();

exports.displayProducts = function(){
    getProducts()
    .then( (products) => {
        let headerDivider = `${magenta('*********************************************************')}`
        console.log(`
            ${headerDivider}
            ${magenta('**          Products          **')}
            ${headerDivider}`)
        let num = 1;
        products.forEach(product => {
            console.log(`${num++}. ${product.title}`)
        })
        prompt.get([{
            name: 'selection',
            description: 'Choose product (#) or type "menu" to return to main menu',
            type: 'string',
            required: true
            }],
            function(err, input) {
                if(input.selection == "menu"){
                    ui.userMenu();
                }else{
                    getOneProduct(parseInt(input.selection))
                    .then (product => {
                        console.log(`
                        Product: ${product.title}
                        Price: ${product.price}
                        1. Purchase this product
                        2. Return to list of Products`)
                        prompt.get([{
                            name: 'selection',
                            description: 'Please enter your choice',
                            type: 'string',
                            required: true
                            }],
                            function(error, input){
                                switch(input.selection) {
                                    case "1":
                                    showPaymentTypes(product.id)
                                    break;
                                    case "2":
                                    exports.displayProducts();
                                    break;
                                }
                            }
                        )
                    })
                }
            }
        )
    })
}

exports.addProduct = function(){
    getProductTypes()
    .then(productTypes => {
        let num = 1;
        productTypes.forEach(productType => {
            console.log(`
               ${num++} ${productType.type}
            `)
        })
        prompt.get([
            {
            name: 'type',
            description: 'Please enter type of product from listed categories',
            type: 'string',
            required: true
            },
            {
            name: 'name',
            description: 'Please enter name of product',
            type: 'string',
            required: true
            },
            {
            name: 'price',
            description: 'Please enter product price',
            type: 'string',
            required: true
            }
            ],
            function(error, input){
                getProductTypeByName(input.type)
                .then(productType => {
                    postProduct(productType.id, parseInt(input.price), input.name, activeUser.id)
                    .then(product => {
                        console.log(`
                            Successfully listed product!
                            Product: ${product.title}
                            Price: ${product.price}
                        `)
                        viewOptions();
                    })
                })
            }
        )
    })
}

const viewOptions = function(){
    console.log(`
    1. View list of your products
    2. Return to main menu`)
    prompt.get([{
        name: 'selection',
        description: 'Please enter your choice',
        type: 'string',
        required: true
        }],
        function(error, input){
            switch(input.selection) {
                case "1":
                exports.viewProductsByUser();
                break;
                case "2":
                ui.userMenu();
                break;
            }
        }
    )
}

exports.viewProductsByUser = function(){
    getProductsByUser(activeUser.id)
    .then (products => {
        console.log(`********* YOUR PRODUCTS *************`)
        let num = 1;
        products.forEach(product => {
            console.log(`
                ${num++}. ${product.title}
                ${product.price}
            `)
        })
        console.log(`
            1. Update Product
            2. Return to Main Menu
        `)
        prompt.get([{
            name: 'selection',
            description: 'Please enter your choice',
            type: 'string',
            required: true
            }],
            function(error, input){
                switch(input.selection) {
                    case "1":
                    updateProduct();
                    break;
                    case "2":
                    ui.userMenu();
                    break;
                }
            }
        )
    })
}

const updateProduct = function(){
    prompt.get([{
        name: 'title',
        description: 'Please name of your product',
        type: 'string',
        required: true
        }],
        function(error, input){
            getProductByUserAndTitle(activeUser.id, input.title)
            .then(product => {
                console.log(`
                    ${product.title}
                    ${product.price}
                `)
                prompt.get([{
                    name: 'title',
                    description: 'Please enter new title',
                    type: 'string',
                    required: true
                    },
                    {
                    name: 'price',
                    description: 'Please enter new price',
                    type: 'string',
                    required: true
                    }],
                    function(error, input){
                        product.title = input.title
                        product.price = input.price
                        putProduct(product)
                        .then(updatedProduct => {
                            console.log(`
                                Product updated successfully!
                                Title: ${updatedProduct.title}
                                Price: ${updatedProduct.price}
                            `)
                            viewOptions();
                        })
                    }
                )
            })
        }
    )
}