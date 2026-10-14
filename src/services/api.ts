import axios from "axios";

// json-server --watch db.json
export const api = axios.create({
  baseURL: '../../db.json'
  //baseURL: 'https://my-json-server.typicode.com/ecalazans/dados-loja'
})
