import axios from "axios"
const services = {}

services.getHousesByPage = (page) => {
  return axios.get(`https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=10`)
}

export default services
