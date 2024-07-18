import axios from 'axios'

const MASTER = axios.create({
  
  baseURL: 'https://api.sige-homolog.lappis.rocks'
   //baseURL: 'http://164.41.98.8:443/'
  
  //baseURL: 'http://164.41.98.17:443/'
  // baseURL: 'http://localhost:443/'
})

export default MASTER
