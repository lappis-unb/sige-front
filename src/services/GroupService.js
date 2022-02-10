import MASTER from './masterApi/http-common'

class GroupService {
  constructor () {
    this.client = MASTER
  }

  async getGroup (id = '') {
    return await this.client.get('groups/' + id)
  }

  async getGroupTypes (groupId, groupTypes) {
    return await this.client.get('group-types/' + groupId, groupTypes)
  }

  async createGroup (groupData) {
    return await this.client.post('groups/', groupData)
  }

  async editGroup (groupId, data) {
    return await this.client.put('groups/' + groupId + '/', data)
  }

  async deleteGroup (groupId) {
    return await this.client.delete('groups/' + groupId)
  }

  async createGroupTypes (groupTypesData) {
    return await this.client.post('group-types/', groupTypesData)
  }

  async editGroupTypes (groupTypesId, data) {
    return await this.client.put('group-types/' + groupTypesId + '/', data)
  }

  async deleteGroupTypes (groupTypesId) {
    return await this.client.delete('group-types/' + groupTypesId)
  }
}

const groupServiceInstance = new GroupService()

export {
  groupServiceInstance
}
