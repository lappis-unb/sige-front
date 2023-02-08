const { default: MASTER } = require("../masterApi/http-common")

const ENERGY_TRANDUCTORS_PATH = "/energy-transductors/"
const ENERGY_TRANDUCTORS_LIST_PATH = "/energy-transductors-list/"

class EnergyTransductors{
  get = async (transductorId) => {
    const response = await MASTER
      .get(`${ENERGY_TRANDUCTORS_PATH}${transductorId}`)
      .catch((err) => {
        this.errors.push(err)
        console.error(err)
      });
    return response;
  }

  getList = async () => {
    const response = await MASTER
      .get(`${ENERGY_TRANDUCTORS_LIST_PATH}`)
      .then((resp) => {
        resp();
        })
      .catch((err) => {
        this.errors.push(err)
        console.error(err)
      });
    return response;
  }
}

export default new EnergyTransductors()