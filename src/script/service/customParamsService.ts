import request from './request';
import { ResponseType, CustomParams } from '../model/index';


export const GetCustomParams = function (): Promise<ResponseType<CustomParams>> {
    return request<CustomParams>({
      url: '/custom-params',
      method: 'get',
    });
};
