import MASTER from './masterApi/http-common'

class CampiService {
  constructor () {
    this.client = MASTER
  }

  async getCampi (id = '') {
    return await this.client.get('campi/' + id)
  }

  async createCampus (campusData) {
    return await this.client.post('campi/', campusData)
  }

  async editCampus (campusId, data) {
    return await this.client.put('campi/' + campusId + '/', data)
  }

  async deleteCampus (campusId) {
    return await this.client.delete('campi/' + campusId)
  }
}

const campiServiceInstance = new CampiService()

export {
  campiServiceInstance
}
