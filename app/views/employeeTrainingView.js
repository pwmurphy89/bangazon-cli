const prompt = require('prompt');
const {red, magenta, blue} = require("chalk");
const {getActiveUser} = require('../activeUser')
const {getTrainingProgramsByEmployee, getTrainingPrograms, getTrainingProgramInfo, postEmployeeTraining} = require("../models/trainingProgramsModel")
const employeesView = require('./employeesView')
const activeUser = getActiveUser();

module.exports.viewEmployeeTrainingPrograms = function(){
    getTrainingProgramsByEmployee(activeUser.id)
    .then(trainingPrograms => {
        let count = 1;
        console.log(`       ******** YOUR TRAINING PROGRAMS *********`)
        trainingPrograms.forEach(trainingProgram => {
            console.log(`
                ${count++}:  ${trainingProgram.title}
                Start Date: ${trainingProgram.startDate}
                End Date: ${trainingProgram.endDate}
                Max Attendees: ${trainingProgram.maxAttendees}
            `)
        });
        console.log(`
            1. View all training programs
            2. Return to employee menu
        `)
        prompt.get([{
            name: 'selection',
            description: 'Choose enter choice (#)',
            type: 'string',
            required: true
            }],
            function(err, input) {
                if(input.selection == "1"){
                    getTrainingPrograms()
                    .then(trainingPrograms => {
                        trainingPrograms.forEach(trainingProgram => {
                            console.log(`
                                ${trainingProgram.id}: ${trainingProgram.title}
                            `)
                        })
                        viewTrainingProgramInfo();
                    })
                }else { employeesView.employeeMenu(); }
            }
        )
    })
}

const viewTrainingProgramInfo = function(){
    prompt.get([{
        name: 'selection',
        description: 'Choose information on training program (#) or type "menu" to return to employee menu',
        type: 'string',
        required: true
        }],
        function(err, input) {
            if(input.selection == "menu"){
                employeesView.employeeMenu();
            }else{
                getTrainingProgramInfo(parseInt(input.selection))
                .then(trainingProgram => {
                    console.log(`       ******** TRAINING PROGRAM *********`)
                    console.log(`
                        Title:  ${trainingProgram.title}
                        Start Date: ${trainingProgram.startDate}
                        End Date: ${trainingProgram.endDate}
                        Max Attendees: ${trainingProgram.maxAttendees}
                    `)
                    enrollInProgramPrompt(trainingProgram.id)
                });
            }
        }
    )
}

const enrollInProgramPrompt = function(trainingProgramId){
    console.log(`
        1. Enroll in this program
        2. Return to list of your training programs
        3. Return to employee menu
    `)
    prompt.get([{
        name: 'selection',
        description: 'Choose information on training program (#) or type "menu" to return to employee menu',
        type: 'string',
        required: true
        }],
        function(err, input) {
            switch(input.selection){
                case "1":
                    enrollInTrainingProgram(trainingProgramId);
                    break;
                case "2":
                    module.exports.viewEmployeeTrainingPrograms()
                    break;
                case "3":
                    employeesView.employeeMenu();
                    break;
            }
        }
    )
}

const enrollInTrainingProgram = function(trainingProgramId){
    postEmployeeTraining(activeUser.id, trainingProgramId)
    .then(trainingProgram => {
        console.log(`
            SUCCESSFULLY ENROLLED IN PROGRAM
            Title:  ${trainingProgram.title}
            Start Date: ${trainingProgram.startDate}
            End Date: ${trainingProgram.endDate}
        `)
        console.log(`
            1. Return to list of your training programs
            2. Return to employee menu
        `)
        prompt.get([{
            name: 'selection',
            description: 'Please enter choice',
            type: 'string',
            required: true
            }],
            function(err, input) {
                if(input.selection == "1"){
                    module.exports.viewEmployeeTrainingPrograms();
                }else {employeesView.employeeMenu(); }
            }
        )
    })
}