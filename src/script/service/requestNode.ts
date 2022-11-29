import axios from 'axios';

const requestNode = axios.create({
  baseURL: import.meta.env.VITE_NODE_URL == undefined ? 'https://testnet.ankr.com' : import.meta.env.VITE_NODE_URL,
});

export default requestNode;
