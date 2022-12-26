import axios, { AxiosRequestConfig } from 'axios';
import { ResponseType } from '../model/index';

// const originUrl = window.location.origin + '/uscan/v1';

const originUrl = window.location.protocol + '//' + window.location.hostname + ':4322' + '/uscan/v1';

console.log('window.location', window.location);

console.log('window.location!!!', window.location.protocol + '//' + window.location.hostname + ':4322');

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL == undefined ? originUrl : import.meta.env.VITE_BASE_URL,
});

const request = async <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
  try {
    const { data } = await instance.request<ResponseType<T>>(config);
    data.code === 200 ? console.log('request', data.msg) : console.error('request', data.msg);
    return data;
  } catch (err) {
    const msg = 'request fail';
    console.error(err);
    return {
      code: -1,
      msg,
      data: err as any,
    };
  }
};

export default request;
