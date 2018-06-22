const faker = require("faker")
const {numbers: {numTrainingPrograms, numEmployees, numEmployeeTraining} } = require("./numbers.json")

module.exports.buildEmployeeTraining = function(trainingProgramsArray){
    let employeeTraining = [];
    for(let i=0;i<trainingProgramsArray.length;i++){
        let maxAttendees = trainingProgramsArray[i].maxAttendees
        let attendance = faker.random.number({
            'min': 5,
            'max': maxAttendees
        });
        for (let j=0; j<attendance; j++) {
            let employeeId = faker.random.number({
                'min': 1,
                'max': numEmployees
            });
            let programId = i + 1
            employeeTraining.push({
                employeeId,
                programId
            });
        }
    }
    return employeeTraining
}