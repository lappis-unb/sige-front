import { measurementServiceInstance } from "../../../src/services/MeasurementService"
import mockAxios from 'jest-mock-axios'



describe("Testing MeasurementService", () => {

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  });

  test('app instance', () => {
    expect(measurementServiceInstance).toBeDefined()
  })

  test('getRealTimeMeasurement', async () => {
    const id = 1
    measurementServiceInstance
      .getRealTimeMeasurement(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('/realtime-measurements/?id=' + id)
  })

  test('getQuarterlyDailyConsumptionGraph', async () => {
    const id = 1
    measurementServiceInstance
      .getQuarterlyDailyConsumptionGraph(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith(`/graph/quarterly-daily-consumption/?campus=${id}`)
  })

  test('getQuarterlyConsumptionOffPeak', async () => {
    const startDate = new Date().toISOString()
    const endDate = new Date().toISOString()
    measurementServiceInstance
      .getQuarterlyConsumptionOffPeak(startDate, endDate)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith(`/graph/quarterly-consumption-off-peak/?start_date=${startDate}&end_date=${endDate}`)
  })

  test('getQuarterlyConsumptionPeak', async () => {
    const startDate = new Date().toISOString()
    const endDate = new Date().toISOString()
    measurementServiceInstance
      .getQuarterlyConsumptionPeak(startDate, endDate)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith(`/graph/quarterly-consumption-peak/?start_date=${startDate}&end_date=${endDate}`)
  })

})