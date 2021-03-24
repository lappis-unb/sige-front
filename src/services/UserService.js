import MASTER from './masterApi/http-common'

class UserService {
  constructor () {
    this.client = MASTER
  }

  async getUserById (userId, token) {
    return await this.client.get('users/' + userId + '/', {
      headers: {
        authorization: 'Token ' + token
      }
    })
  }

  async login (email, password) {
    return await this.client.post('login/', { email, password })
  }

  async createUser ({ email, password, name }) {
    return await this.client.post('users/', { email, password, name })
  }

  async editUser ({ userId, userData, userToken }) {
    return await this.client.put('users/' + userId + '/', userData,
      {
        headers: {
          authorization: 'Token ' + userToken
        }
      })
  }
}

const userServiceInstance = new UserService()

export {
  userServiceInstance
}
