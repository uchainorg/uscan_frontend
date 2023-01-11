import request from '@/utils/request';
import { ResponseType } from '@/model/index';
import { CustomParams } from '@/model/customizationParameters';

export const GetCustomParams = function (): Promise<ResponseType<CustomParams>> {
  return request<CustomParams>({
    url: '/custom-params',
    method: 'get',
  });
};
