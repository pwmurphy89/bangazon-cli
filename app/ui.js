'use strict';
process.title = 'Bangazon CLI App';

const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');

const { setActiveUser, getActiveUser } = require("./activeUser");
const {userRegisterView, userLoginView} = require("./views/usersView")
prompt.message = colors.blue("Bangazon Corp");


// app modules
// const { promptNewUser } = require('./controllers/userCtrl')
//Don't think i need this command....
// prompt.start();

const welcomeMenu = () => {
    let headerDivider = `${magenta('*********************************************************')}`
      console.log(`
    ${headerDivider}
    ${magenta('**          Welcome to Bangazon Marketplace!          **')}
    ${headerDivider}
    ${magenta('1.')} Login
    ${magenta('2.')} Register Account
    ${magenta('3.')} Employee Login`)
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], welcomeMenuHandler );
}

const userMenu = () => {
    const activeUser = getActiveUser();
    let headerDivider = `${magenta('*********************************************************')}`
    console.log(`
    ${headerDivider}
    ${magenta(`**           Welcome ${activeUser.firstName} ${activeUser.lastName}           **`)}
    ${magenta(`**      Bangazon Command Line Ordering System      **`)}
    ${headerDivider}
    ${magenta('1.')} Browse Products
    ${magenta('2.')} View Orders
    ${magenta('3.')} Add Product`)
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], userMenuHandler );
}

const employeeMenu = () => {
  const activeUser = getActiveUser();
  let headerDivider = `${magenta('*********************************************************')}`
  console.log(`
  ${headerDivider}
  ${magenta(`**  Welcome ${activeUser.firstName} ${activeUser.lastName}  **`)}
  ${magenta(`**       Bangzon Employee        **`)}
  ${headerDivider}
  ${magenta('1.')} Department Information
  ${magenta('2.')} Computer Information
  ${magenta('3.')} Training Programs`)
  prompt.get([{
    name: 'choice',
    description: 'Please make a selection'
  }], employeeMenuHandler );
}

const welcomeMenuHandler = (error, userInput) => {
  switch(userInput.choice) {
    case "1":
      userLoginView()
      .then( (activeUser) => {
        setActiveUser(activeUser);
        userMenu();
      })
      .catch( (error) => {
        console.log(error)
        welcomeMenu();
      })
      break;
    case "2":
      userRegisterView()
      .then( (newUser) => {
        setActiveUser(newUser);
        userMenu();
      })
      .catch( (error) => {
        console.log(error)
        welcomeMenu();
      })
      break;
    case "3":
      employeeView()
      .then( (employee) => {
        setActiveUser(employee);
        employeeMenu();
      })
      .catch( (error) => {
        console.log(error)
        welcomeMenu();
      })
      break;
  }
};

const userMenuHandler = (error, userInput) => {
  switch(userInput.choice) {
    case "1":
      // userLoginView()
      // .then( (activeUser) => {
      //   setActiveUser(activeUser);
      //   userMenuMenu();
      // })
      // .catch( (error) => {
      //   console.log(error)
      // })
      break;
    case "2":
      // registerUserView()
      // .then( (newUser) => {
      //   setActiveUser(newUser);
      //   displayMainMenu();
      // })
      // .catch( (error) => {
      //   console.log(error)
      // })
      break;
  }
};

const employeeMenuHandler = (error, userInput) => {
  switch(userInput.choice) {
    case "1":
      // userLoginView()
      // .then( (activeUser) => {
      //   setActiveUser(activeUser);
      //   userMenuMenu();
      // })
      // .catch( (error) => {
      //   console.log(error)
      // })
      break;
    case "2":
      // newUserView()
      // .then( (newUser) => {
      //   setActiveUser(newUser);
      //   displayMainMenu();
      // })
      // .catch( (error) => {
      //   console.log(error)
      // })
      break;
  }
};

welcomeMenu();