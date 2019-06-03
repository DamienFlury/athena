import Axios from 'axios';

const httpClient = Axios.create({
  baseURL: 'https://localhost:5001/api/',
});

export default httpClient;
