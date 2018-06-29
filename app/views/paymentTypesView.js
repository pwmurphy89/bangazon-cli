const { getUserPaymentTypes, postPaymentType, getOnePaymentType } = require("../models/paymentTypesModel")
const { getActiveUser } = require("../activeUser");
const {placeOrder} = require('./ordersView')
const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const activeUser = getActiveUser();

module.exports.showPaymentTypes = function(productId){
    getUserPaymentTypes(parseInt(activeUser.id))
    .then((paymentTypes) => {
        let count = 1;
        paymentTypes.forEach(paymentType => {
            console.log(`
                ${count++}: ${paymentType.type}, Account Number: ${paymentType.accountNumber}
            `)
        });
        prompt.get([{
            name: 'selection',
            description: 'Choose a payment option or type "add" to add payment option',
            type: 'string',
            required: true
            }],
            function(err, input) {
                if(input.selection == "add"){
                    prompt.get([{
                        name: 'type',
                        description: 'Enter type of payment option',
                        type: 'string',
                        required: true
                        },
                        {
                        name: 'accountNumber',
                        description: 'Enter payment account number',
                        type: 'string',
                        required: true
                        }],
                        function(err, input) {
                            postPaymentType(activeUser.id, input.type, input.accountNumber)
                            .then( (paymentType) =>
                                placeOrder(paymentType.id, productId)
                            )
                        }
                    )
                }else{
                    getOnePaymentType(parseInt(input.selection))
                    .then((paymentType) => {
                        placeOrder(paymentType.id, productId)
                    })
                }
            })
    })
}