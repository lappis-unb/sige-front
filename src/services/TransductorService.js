import MASTER from './masterApi/http-common'

class TransductorService {
  constructor () {
    this.client = MASTER
  }

  async getTransductorById (transductorId) {
    return await this.client.get('energy-transductors/' + transductorId)
  }

  async getTransductorsByCampus (campusId) {
    return await this.client.get(`energy-transductors/?campus_id=${campusId}`)
  }

  async editTransductor (id, data) {
    return await this.client.put('energy-transductors/' + id + '/', data)
  }

  async deleteTransductor (id) {
    return await this.client.delete('energy-transductors/' + id)
  }

  async createTransductor (data) {
    return await this.client.post('energy-transductors/', data)
  }

  async listTransductors () {
    return await this.client.get('energy-transductors-list/')
  }
}

const transductorServiceInstance = new TransductorService()

export {
  transductorServiceInstance
}
