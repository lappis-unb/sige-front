import MASTER from './masterApi/http-common'

class ChartService {
  constructor () {
    this.client = MASTER
  }

  async getAllCampiInfo () {
    try {
      const response = await this.client.get('/entities/')
      return response.data[0].children
    } catch (error) {
      console.log(error)
      return []
    }
  }
}

export default ChartService
