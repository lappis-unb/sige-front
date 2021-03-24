import { slaveServiceInstance } from "../../../src/services/SlaveService"
import mockAxios from 'jest-mock-axios'



describe("Testing SlaveService", () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  });

  test('app instance', () => {
    expect(slaveServiceInstance).toBeDefined();
  })

  test('getSlave without id', async () => {
    slaveServiceInstance
      .getSlave()
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('slave/')
  })

  test('getSlave with id', async () => {
    const id = 1
    slaveServiceInstance
      .getSlave(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('slave/' + id)
  })

  test('create slave', async () => {
    const data =  {
      name: "FGA",
      id: 1
    }

    slaveServiceInstance
      .createSlave(data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.post).toHaveBeenCalledWith('slave/', data)
  })

  test('edit slave', async () => {
    const id = 1
    const data =  {
      name: "FGA"
    }

    slaveServiceInstance
      .editSlave(id, data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.put).toHaveBeenCalledWith('slave/' + id + '/', data)
  })

  test('delete slave', async () => {
    const id = 1

    slaveServiceInstance
      .deleteSlave(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.delete).toHaveBeenCalledWith('slave/' + id)
  })
})