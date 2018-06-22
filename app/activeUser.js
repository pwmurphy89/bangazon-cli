'use strict';

let activeUser = {
    id: 0,
    firstName: "",
    lastName: "",
    accountDate: ""
}

module.exports.setActiveUser = (user) => {
  activeUser.id = user.id,
  activeUser.firstName = user.firstName,
  activeUser.lastName = user.lastName,
  activeUser.accountDate = user.accountDate
}

module.exports.getActiveUser = () => {
  if(activeUser.id){
    return activeUser;
  }else{
    return false;
  }
}
