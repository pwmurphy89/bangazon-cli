const prompt = require('prompt');
const { postEmployee, getEmployees, getOneEmployee } = require('../models/employeesModel')

module.exports.employeeLoginView = function(){
    return new Promise( (resolve, reject) => {
        getEmployees()
        .then( (employees) => {
            let num = 1;
            employees.forEach(employee => {
                console.log(`${num++}. ${employee.firstName} ${employee.lastName}`)
            });
            prompt.get([{
                name: 'selection',
                description: 'Choose employee',
                type: 'string',
                required: true
                }],
                function(err, input) {
                    getOneEmployee(parseInt(input.selection))
                    .then (employee => {
                        console.log(`Hi ${employee.firstName}!`);
                        prompt.get([{
                            name: 'password',
                            description: 'Please enter your password',
                            type: 'string',
                            required: true
                            }],
                            function(err, input) {
                                if(input.password == employee.password){
                                    // console.log(`Welcome ${employee.firstName}!`);
                                    resolve(employee)
                                }else{
                                    console.log(`Incorrect Password`)
                                    prompt.get([{
                                        name: 'password2',
                                        description: 'Please re-enter password',
                                        type: 'string',
                                        required: true
                                        }],
                                        function(err, input) {
                                            if(input.password2 == employee.password){
                                                // console.log(`Welcome ${employee.firstName}!`);
                                                resolve(employee)
                                            }else{
                                                console.log("Return to main menu, still need to write code for this")
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    })
                }
            )
        })
    })
}