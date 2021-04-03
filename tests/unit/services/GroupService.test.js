import { groupServiceInstance } from '../../../src/services/GroupService'
import mockAxios from 'jest-mock-axios'

describe('Testing GroupService', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  });

  test('app instance', () => {
    expect(groupServiceInstance).toBeDefined();
  })

  test('get group without id', async () => {
    groupServiceInstance
      .getGroup()
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('groups/')
  })

  test('get group with id', async () => {
    const id = 1
    groupServiceInstance
      .getGroup(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('groups/' + id)
  })

  test('get group types', async () => {
    const id = 1
    groupServiceInstance
      .getGroupTypes(id, '')
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.get).toHaveBeenCalledWith('group-types/' + id, '')
  })

  test('create group', async () => {
    const data = {
      name: 'FGA',
      id: 1
    }

    groupServiceInstance
      .createGroup(data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.post).toHaveBeenCalledWith('groups/', data)
  })

  test('create group-types', async () => {
    const data = {
      name: 'FGA',
      id: 1
    }

    groupServiceInstance
      .createGroupTypes(data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.post).toHaveBeenCalledWith('group-types/', data)
  })

  test('edit group', async () => {
    const id = 1
    const data = {
      name: 'FGA'
    }

    groupServiceInstance
      .editGroup(id, data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.put).toHaveBeenCalledWith('groups/' + id + '/', data)
  })

  test('edit group-types', async () => {
    const id = 1
    const data = {
      name: 'FGA'
    }

    groupServiceInstance
      .editGroupTypes(id, data)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.put).toHaveBeenCalledWith('group-types/' + id + '/', data)
  })

  test('delete group', async () => {
    const id = 1

    groupServiceInstance
      .deleteGroup(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.delete).toHaveBeenCalledWith('groups/' + id)
  })

  test('delete group-types', async () => {
    const id = 1

    groupServiceInstance
      .deleteGroupTypes(id)
      .then(jest.fn)
      .catch(jest.fn)

    expect(mockAxios.delete).toHaveBeenCalledWith('group-types/' + id)
  })
})