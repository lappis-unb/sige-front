import MASTER from '../services/masterApi/http-common'

export function loginRequest (userInfo, success, error) {
  MASTER
    .post('login/', userInfo)
    .then(res => {
      var user = {
        userToken: res.data.token,
        userID: res.data.user.id,
        username: res.data.user.name,
        useremail: res.data.user.email
      }
      success(user)
    })
    .catch(err => {
      error(err)
    })
}
