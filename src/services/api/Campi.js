const { default: MASTER } = require("../masterApi/http-common")

const CAMPI_PATH = "/campi/"

class Campi{
  get = async (campusId) => {
    const response = await MASTER
      .get(`${CAMPI_PATH}${campusId}`)
      .catch((err) => {
        this.errors.push(err)
        console.error(err)
      });
    return response;
  }
}
export default new Campi()