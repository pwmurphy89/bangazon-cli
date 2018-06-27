const {getProducts, getOneProduct } = require("../models/productsModel")
const { getActiveUser } = require("../activeUser");
const {red, magenta, blue} = require("chalk");
const {showPaymentTypes} = require("./paymentTypesView")
const prompt = require('prompt');
const activeUser = getActiveUser();

module.exports.displayProducts = function(){
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
            description: 'Choose product (#)',
            type: 'string',
            required: true
            }],
            function(err, input) {
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
                                // module.exports.displayProducts();
                                break;
                            }
                        }
                    )
                })
            }
        )
    })
}

