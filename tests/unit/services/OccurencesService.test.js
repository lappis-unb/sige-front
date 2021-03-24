import { occurrenceServiceInstance } from "../../../src/services/OccurencesService"
import mockAxios from 'jest-mock-axios'



describe("Testing OccurencesService", () => {

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  })

  test('app instance', () => {
    expect(occurrenceServiceInstance).toBeDefined()
  })

  test('getOccurences with type', async () => {
    const type = 'active'
    occurrenceServiceInstance
      .getOccurences({ type })
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith(`/occurences/?&type=${type}`)
  })

  test('getOccurences with campus', async () => {
    const campus = 1
    occurrenceServiceInstance
      .getOccurences({ campus })
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith(`/occurences/?&campus=${campus}`)
  })

  test('getOccurences with id', async () => {
    const id = 1
    occurrenceServiceInstance
      .getOccurences({ occurrenceId: id })
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith(`/occurences/?&id=${id}`)
  })

  test('getOccurences with id and type', async () => {
    const type = 'active'
    const id = 1
    occurrenceServiceInstance
      .getOccurences({ occurrenceId: id, type })
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith(`/occurences/?&id=${id}&type=${type}`)
  })

})