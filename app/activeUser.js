let activeUser = {
    id: 0,
    firstName: "",
    lastName: ""
}

module.exports.setActiveUser = (user) => {
  activeUser.id = user.id,
  activeUser.firstName = user.firstName,
  activeUser.lastName = user.lastName
}

module.exports.getActiveUser = () => {
  return activeUser
}
