import request from '@/utils/request';
import { ResponseType } from '@/model/index';
import { SearchRes } from '@/model/search';

export const SearchByType = function (filterType: number, keyWord: string): Promise<ResponseType<SearchRes>> {
  return request<SearchRes>({
    url: '/search?type=' + filterType + '&keyword=' + keyWord,
    method: 'get',
  });
};
