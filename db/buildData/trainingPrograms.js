const faker = require("faker")
const {numbers: {numTrainingPrograms} } = require("./numbers.json")

module.exports.buildTrainingPrograms = function(){
    let trainingPrograms = [];
    for(let i=0;i<numTrainingPrograms;i++){
        let startDate = faker.date.future().toDateString();
        let endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14);
        endDate = endDate.toDateString();

        trainingPrograms.push({
            title: faker.company.bs(),
            startDate: startDate,
            endDate: endDate,
            maxAttendees: faker.random.number(25)
        })
    }
    return trainingPrograms
}