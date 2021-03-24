import { transductorServiceInstance } from "../../../src/services/TransductorService"
import mockAxios from 'jest-mock-axios'

describe("Testing TransductorService", () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  });

  test('app instance', () => {
    expect(transductorServiceInstance).toBeDefined();
  })

  test('getTransductor with id', async () => {
    const id = 1
    transductorServiceInstance
      .getTransductorById(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('energy-transductors/' + id)
  })

  test('getTransductor by campus', async () => {
    const campusId = 1
    transductorServiceInstance
      .getTransductorsByCampus(campusId)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('energy-transductors/?campus_id=' + campusId)
  })

  test('List transductors', async () => {
    transductorServiceInstance
      .listTransductors()
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('energy-transductors-list/')
  })

  test('create transductor', async () => {
    const data =  {
      name: "FGA",
      id: 1
    }

    transductorServiceInstance
      .createTransductor(data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.post).toHaveBeenCalledWith('energy-transductors/', data)
  })

  test('edit transductor', async () => {
    const id = 1
    const data =  {
      name: "FGA"
    }

    transductorServiceInstance
      .editTransductor(id, data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.put).toHaveBeenCalledWith('energy-transductors/' + id + '/', data)
  })

  test('delete transductor', async () => {
    const id = 1

    transductorServiceInstance
      .deleteTransductor(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.delete).toHaveBeenCalledWith('energy-transductors/' + id)
  })
})