const faker = require("faker")
const {numbers: {numTrainingPrograms} } = require("./numbers.json")

module.exports.buildTrainingPrograms = function(){
    let trainingPrograms = [];
    for(let i=0;i<numTrainingPrograms;i++){
        let startDate = faker.date.future();
        let endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14);

        trainingPrograms.push({
            title: faker.company.bs(),
            startDate: startDate,
            endDate: endDate,
            maxAttendees: faker.random.number({
                'min': 5,
                'max': 25
            })
        })
    }
    return trainingPrograms
}