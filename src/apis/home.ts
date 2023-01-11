import request from '@/utils/request';
import { ResponseType } from '@/model/index';
import { HomePageInfo } from '@/model/home';

export const GetHome = function (): Promise<ResponseType<HomePageInfo>> {
  return request<HomePageInfo>({
    url: '/home',
    method: 'get',
  });
};
