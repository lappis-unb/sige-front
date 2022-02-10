import { userServiceInstance } from "../../../src/services/UserService"
import mockAxios from 'jest-mock-axios'

describe("Testing UserService", () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  });

  test('app instance', () => {
    expect(userServiceInstance).toBeDefined();
  })

  test('getUserById', async () => {
    const userId = 1
    const userToken = 'fsddsçkjvlçkjlyhd7238yhdjbg23ipeg'
    userServiceInstance
      .getUserById(userId, userToken)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('users/' + userId + '/', {
      headers: {
        authorization: 'Token ' + userToken
      }
    })
  })

  test('login', async () => {
    const userEmail = 'teste@example.com'
    const userPassword = 'fsddsçkjvlçkjlyhd7238yhdjbg23ipeg'
    userServiceInstance
      .login(userEmail, userPassword)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.post).toHaveBeenCalledWith('login/', { email: userEmail, password: userPassword })
  })

  test('createUser', async () => {
    const userName = 'Teste'
    const userEmail = 'teste@example.com'
    const userPassword = 'fsddsçkjvlçkjlyhd7238yhdjbg23ipeg'

    userServiceInstance
      .createUser({ email: userEmail, password: userPassword, name: userName })
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.post).toHaveBeenCalledWith('users/', { email: userEmail, password: userPassword, name: userName })
  })
})