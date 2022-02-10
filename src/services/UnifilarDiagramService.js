import MASTER from './masterApi/http-common'

class UnifilarDiagramService {
  constructor () {
    this.client = MASTER
  }

  async getLinesByCampus (campusId) {
    return await this.client.get(`/lines/?campus=${campusId}`)
  }
}

const unifilarDiagramServiceInstance = new UnifilarDiagramService()

export {
  unifilarDiagramServiceInstance
}
