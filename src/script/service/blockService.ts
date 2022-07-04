import request from './request';
import { ResponseType, BlocksResponse } from '../model/index';

// export const GetBlocks = () => {
//   return request<BlocksResponse>({
//     url: '/v1/blocks?offset=0&limit=10',
//     method: 'get',
//   });
// };

export const GetBlocks = function (pageNumber: number, pageSize: number): Promise<ResponseType<BlocksResponse>> {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  return request<BlocksResponse>({
    url: '/v1/blocks?offset=' + offset + '&limit=' + limit,
    method: 'get',
  });
};
