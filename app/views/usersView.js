// const promptNewUser = require('../controllers/userCtrl')
const prompt = require('prompt');
const ui = require("../ui")
const { postUser, getUsers, getOneUser } = require('../models/usersModel')

// Don't think I even need this command....
// prompt.start()

module.exports.userLoginView = function(){
    return new Promise( (resolve, reject) => {
        getUsers()
        .then( (users) => {
            let num = 1;
            users.forEach(user => {
                console.log(`${num++}. ${user.firstName} ${user.lastName}`)
            });
            prompt.get([{
                name: 'selection',
                description: 'Choose user',
                type: 'string',
                required: true
                }],
                function(err, input) {
                    getOneUser(parseInt(input.selection))
                    .then (user => {
                        console.log(`Hi ${user.firstName}!`);
                        prompt.get([{
                            name: 'password',
                            description: 'Please enter your password',
                            type: 'string',
                            required: true
                            }],
                            function(err, input) {
                                if(input.password == user.password){
                                    resolve(user)
                                }else{
                                    console.log(`Incorrect Password`)
                                    prompt.get([{
                                        name: 'password2',
                                        description: 'Please re-enter password',
                                        type: 'string',
                                        required: true
                                        }],
                                        function(err, input) {
                                            if(input.password2 == user.password){
                                                resolve(user)
                                            }else{
                                                console.log("Incorrect password, returning to main menu")
                                                console.log(ui)
                                                ui.welcomeMenu();
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    })
                    .catch( (error) => {
                        console.log(error)
                    })
                }
            )
        })
    })
}

module.exports.userRegisterView = function(){
    return new Promise( (resolve, reject) => {
    prompt.get([{
        name: 'firstName',
        description: 'Enter first name',
        type: 'string',
        required: true
        }, {
        name: 'lastName',
        description: 'Enter last name',
        type: 'string',
        required: true
        },
        {
        name: 'password',
        description: 'Enter password',
        type: 'string',
        required: true
        }],
        function(err, newUser) {
            if (err) return reject(err);
            newUser.accountDate = new Date();
            postUser(newUser)
            .then( (user) => {
                resolve(user)
            })
            .catch( (error) => {
                console.log(error)
              })
          }
    )
    })
}