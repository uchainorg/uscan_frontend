import axios from 'axios';

const request = axios.create({
  baseURL: 'https://apis-stage.ankr.com/chain-scan',
});

export default request;
