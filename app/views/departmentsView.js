const prompt = require('prompt');
const {getActiveUser} = require('../activeUser')
const {getDepartments, getEmployeeDepartment, getOneDepartmentByName, getDepartmentSupervisor} =  require('../models/departmentsModel')
const employeesView = require("./employeesView")
const {red, magenta, blue} = require("chalk");
const ui = require('../ui')

const activeUser = getActiveUser();

exports.viewDepartments = function(){
    getEmployeeDepartment(activeUser.id)
    .then(department => {
        console.log(`${magenta(`               ****** YOUR DEPARTMENT ******`)}`)
        console.log(`           ${department.name}`)
        getDepartments()
        .then((departments) => {
            let count = 1;
            console.log(`${magenta(`            ****** ALL DEPARTMENTS ******`)}`)
            departments.forEach(department => {
                console.log(`
                    ${count++}. ${department.name}
                `)
            });
            departmentPrompt();
        })
    })
}

const departmentPrompt = function(){
    console.log(`
        1. Get department information
        2. Return to employee menu
    `)
    prompt.get([{
        name: 'selection',
        description: 'Please choose option (#)',
        type: 'string',
        required: true
        }],
        function(err, input) {
            if(input.selection == "1"){
                getDeparmentInfo();
            }else { employeesView.employeeMenu(); }
        }
    )
}

const getDeparmentInfo = function(){
    prompt.get([{
        name: 'name',
        description: 'Please enter department name',
        type: 'string',
        required: true
        }],
        function(err, input) {
            getOneDepartmentByName(input.name)
            .then(department => {
                getDepartmentSupervisor(department.id)
                .then(department => {
                    console.log(`
                        Department Name: ${department.name}
                        Supervisor: ${department.firstName} ${department.lastName}
                        Budget: ${department.budget}
                    `)
                    console.log(`
                        1. Return to list of departments
                        2. Return to Employee Menu
                    `)
                    prompt.get([{
                        name: 'selection',
                        description: 'Please enter choice',
                        type: 'string',
                        required: true
                        }],
                        function(err, input) {
                            if(input.selection == "1"){
                                exports.viewDepartments();
                            }else { employeesView.employeeMenu() }
                        }
                    )
                })
            })
        }
    )
}