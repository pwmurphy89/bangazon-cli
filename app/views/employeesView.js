const prompt = require('prompt');
const {red, magenta, blue} = require("chalk");
const {getActiveUser} = require('../activeUser')
const { postEmployee, getEmployees, getOneEmployee } = require('../models/employeesModel')
const {viewDepartments} = require('./departmentsView')
const {viewEmployeeComputer} = require("./computersView")
const {viewEmployeeTrainingPrograms} = require("./employeeTrainingView")
const ui = require('../ui')
const activeUser = getActiveUser();



exports.employeeMenu = () => {
    const activeUser = getActiveUser();
    let headerDivider = `${magenta('*********************************************************')}`
    console.log(`
    ${headerDivider}
    ${magenta(`**  Welcome ${activeUser.firstName} ${activeUser.lastName}  **`)}
    ${magenta(`**       Bangzon Employee        **`)}
    ${headerDivider}
    ${magenta('1.')} Department Information
    ${magenta('2.')} Your Computer Information
    ${magenta('3.')} Your Training Programs
    ${magenta('4.')} Log Out`)
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], exports.employeeMenuHandler );
  }

exports.employeeMenuHandler = (error, userInput) => {
    switch(userInput.choice) {
      case "1":
        viewDepartments()
        break;
      case "2":
        viewEmployeeComputer()
        break;
      case "3":
        viewEmployeeTrainingPrograms();
        break;
      case "4":
        ui.logOut();
        break;
    }
};

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
                                                resolve(employee)
                                            }else{
                                                console.log("Incorrect password, returning to main menu")
                                                ui.welcomeMenu();
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