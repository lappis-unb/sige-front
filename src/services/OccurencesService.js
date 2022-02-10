import MASTER from './masterApi/http-common'

class OccurenceService {
  constructor () {
    this.client = MASTER
  }

  async getOccurences ({ occurrenceId, type, campus }) {
    const typeQuery = type ? `&type=${type}` : ''
    const campusQuery = campus ? `&campus=${campus}` : ''
    const occurrencyIdQuery = occurrenceId ? `&id=${occurrenceId}` : ''
    return await this.client.get(`/occurences/?${occurrencyIdQuery}${campusQuery}${typeQuery}`)
  }
}

const occurrenceServiceInstance = new OccurenceService()

export {
  occurrenceServiceInstance
}
