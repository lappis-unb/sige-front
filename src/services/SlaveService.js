import MASTER from './masterApi/http-common'

class SlaveService {
  constructor () {
    this.client = MASTER
  }

  async getSlave (id = '') {
    return await this.client.get('slave/' + id)
  }

  async createSlave (slaveData) {
    return await this.client.post('slave/', slaveData)
  }

  async editSlave (slaveId, data) {
    return await this.client.put('slave/' + slaveId + '/', data)
  }

  async deleteSlave (slaveId) {
    return await this.client.delete('slave/' + slaveId)
  }
}

const slaveServiceInstance = new SlaveService()

export {
  slaveServiceInstance
}
