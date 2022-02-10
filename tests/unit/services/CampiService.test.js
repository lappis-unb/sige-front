import { campiServiceInstance } from "../../../src/services/CampiService"
import mockAxios from 'jest-mock-axios'



describe("Testing CampiService", () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  });

  test('app instance', () => {
    expect(campiServiceInstance).toBeDefined();
  })

  test('get campi without id', async () => {
    campiServiceInstance
      .getCampi()
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('campi/')
  })

  test('get campi with id', async () => {
    const id = 1
    campiServiceInstance
      .getCampi(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('campi/' + id)
  })

  test('create campus', async () => {
    const data =  {
      name: "FGA",
      id: 1
    }
    
    campiServiceInstance
      .createCampus(data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.post).toHaveBeenCalledWith('campi/', data)
  })

  test('edit campus', async () => {
    const id = 1
    const data =  {
      name: "FGA"
    }

    campiServiceInstance
      .editCampus(id, data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.put).toHaveBeenCalledWith('campi/' + id + '/', data)
  })

  test('delete campus', async () => {
    const id = 1

    campiServiceInstance
      .deleteCampus(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.delete).toHaveBeenCalledWith('campi/' + id)
  })
})