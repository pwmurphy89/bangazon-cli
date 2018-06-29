const prompt = require('prompt');
const {red, magenta, blue} = require("chalk");
const {getActiveUser} = require('../activeUser')
const {getEmployeeComputer} = require("../models/computersModel")
const employeesView = require("./employeesView")
const ui = require('../ui')
const activeUser = getActiveUser();

exports.viewEmployeeComputer = function(){
    getEmployeeComputer(activeUser.id)
    .then(computer => {
        console.log(`
            Employee: ${computer.firstName} ${computer.lastName}
            Purchase Date: ${computer.purchaseDate}
            Decomission Date: ${computer.decommissionDate}
        `)
        prompt.get([{
            name: 'selection',
            description: 'Please enter "menu" to return to employee menu',
            type: 'string',
            required: true
            }],
            function(err, input) {
                if(input.selection == "menu"){
                    employeesView.employeeMenu();
                }
            }
        )
    })
}