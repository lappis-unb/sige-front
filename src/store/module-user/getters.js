const authStatus = (state) => {
  return !!(state.userToken && state.userID)
}

const getUser = (state) => {
  const user = {
    name: state.username,
    email: state.useremail,
    id: state.userID,
    token: state.userToken
  }
  return user
}

const getPage = (state) => {
  return state.currentPage
}

const isAdmin = (state) => {
  console.log(state)
  return state.admin
}

export {
  authStatus,
  getUser,
  getPage,
  isAdmin
}
