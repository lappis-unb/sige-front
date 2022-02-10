import MASTER from './masterApi/http-common'

class MeasurementService {
  constructor () {
    this.client = MASTER
  }

  async getRealTimeMeasurement (measurementId) {
    return await this.client.get('/realtime-measurements/?id=' + measurementId)
  }

  async getQuarterlyDailyConsumptionGraph (selectedCampusId) {
    return await this.client.get(`/graph/quarterly-daily-consumption/?campus=${selectedCampusId}`)
  }

  async getQuarterlyConsumptionOffPeak (startDate, endDate) {
    return await this.client.get(`/graph/quarterly-consumption-off-peak/?start_date=${startDate}&end_date=${endDate}`)
  }

  async getQuarterlyConsumptionPeak (startDate, endDate) {
    return await this.client.get(`/graph/quarterly-consumption-peak/?start_date=${startDate}&end_date=${endDate}`)
  }
}

const measurementServiceInstance = new MeasurementService()

export {
  measurementServiceInstance
}
