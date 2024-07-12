import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.56.103:3001',
});
