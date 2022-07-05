import request from './request';
import { ResponseType, BlocksResponse } from '../model/index';
import { BlockDetail } from '../model/block';

export const GetBlocks = function (pageNumber: number, pageSize: number): Promise<ResponseType<BlocksResponse>> {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  return request<BlocksResponse>({
    url: '/v1/blocks?offset=' + offset + '&limit=' + limit,
    method: 'get',
  });
};

export const GetBlockByNumber = function (blockNumber: number): Promise<ResponseType<BlockDetail>> {
  return request<BlockDetail>({
    url: '/v1/blocks/' + blockNumber,
    method: 'get',
  });
};
