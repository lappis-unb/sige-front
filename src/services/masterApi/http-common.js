import axios from 'axios'

const MASTER = axios.create({
  baseURL: process.env.SIGE_MASTER_URL
})

export default MASTER
