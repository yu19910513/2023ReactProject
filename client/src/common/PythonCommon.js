import axios from "axios";

export default axios.create({
  baseURL: "/pipapi",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  }
});
