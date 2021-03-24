import { unifilarDiagramServiceInstance } from "../../../src/services/UnifilarDiagramService"
import mockAxios from 'jest-mock-axios'

describe("Testing UnifilarDiagramService", () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  });

  test('app instance', () => {
    expect(unifilarDiagramServiceInstance).toBeDefined();
  })

  test('getLinesByCampus', async () => {
    const campusId = 1
    unifilarDiagramServiceInstance
      .getLinesByCampus(campusId)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith(`/lines/?campus=${campusId}`)
  })
})