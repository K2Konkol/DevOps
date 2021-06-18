import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost/img",
    headers: {
      "Content-type": "application/json"
    }
  });