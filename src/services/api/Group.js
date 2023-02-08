const { default: MASTER } = require("../masterApi/http-common")

const GROUP_URL = '/groups/';
const GROUPS_TYPES_URL = '/group-types/';

class Group {

    getGroups = async (id = null) => {
    await MASTER
      .get(`${GROUP_URL}` + id)
      .then((res) => {
        res();
      })
      .catch((err) => {
        this.errors.push(err)
        console.error(err)
      })
  }
  deleteGroup = async (id) => {
    await MASTER
      .delete(`${GROUP_URL}${id}`)
      .then((res) => {
        res();
      })
      .catch((err) => {
        this.errors.push(err)
        console.error(err)
      })
  }
  groupTypes = async () => {
    await MASTER
      .get(`${GROUPS_TYPES_URL}`)
      .then((res) => {
        res();
      })
      .catch((err) => {
        this.errors.push(err)
        console.error(err)
      })
  }
  postGroup = async (data) => {
    await MASTER
      .post(`${GROUP_URL}`, data)
      .then((res) => {
        res();
      })
      .catch((err) => {
        this.errors.push(err)
        console.error(err)
      })
  }

}


export default new Group();