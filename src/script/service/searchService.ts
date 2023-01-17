import request from './request';
import { ResponseType } from '../model/index';

export const SearchByType = function (filterType: number, keyWord: string): Promise<ResponseType<any>> {
  return request<any>({
    url: '/search?type=' + filterType + '&keyword=' + keyWord,
    method: 'get',
  });
};
