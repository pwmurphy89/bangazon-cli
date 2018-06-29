process.title = 'Bangazon CLI App';

const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');

const { setActiveUser, getActiveUser } = require("./activeUser");
const {userRegisterView, userLoginView} = require("./views/usersView")
const {employeeMenuHandler, employeeLoginView} = require("./views/employeesView")
const {displayProducts, addProduct, viewProductsByUser} =  require('./views/productsView')
const {viewOrders} = require('./views/ordersView')
prompt.message = colors.blue("Bangazon Corp");

exports.welcomeMenu = () => {
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

exports.userMenu = () => {
    const activeUser = getActiveUser();
    let headerDivider = `${magenta('*********************************************************')}`
    console.log(`
    ${headerDivider}
    ${magenta(`**           Welcome ${activeUser.firstName} ${activeUser.lastName}           **`)}
    ${magenta(`**      Bangazon Command Line Ordering System      **`)}
    ${headerDivider}
    ${magenta('1.')} Browse Products
    ${magenta('2.')} View Orders
    ${magenta('3.')} View your listed products
    ${magenta('4.')} Add Product`)
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
        exports.userMenu();
      })
      .catch( (error) => {
        console.log(error)
        exports.welcomeMenu();
      })
      break;
    case "2":
      userRegisterView()
      .then( (newUser) => {
        setActiveUser(newUser);
        exports.userMenu();
      })
      .catch( (error) => {
        console.log(error)
        exports.welcomeMenu();
      })
      break;
    case "3":
      employeeLoginView()
      .then( (employee) => {
        setActiveUser(employee);
        employeeMenu();
      })
      .catch( (error) => {
        console.log(error)
        exports.welcomeMenu();
      })
      break;
  }
};

const userMenuHandler = (error, userInput) => {
  const activeUser = getActiveUser();
  switch(userInput.choice) {
    case "1":
      displayProducts()
      break;
    case "2":
      viewOrders(activeUser.id)
      break;
    case "3":
      viewProductsByUser();
      break;
    case "4":
      addProduct();
      break;
  }
};

exports.welcomeMenu();