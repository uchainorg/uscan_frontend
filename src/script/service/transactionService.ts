import request from './request';
import { ResponseType, TransactionsResponse } from '../model/index';

export const GetTransactions = function (
  pageNumber: number,
  pageSize: number
): Promise<ResponseType<TransactionsResponse>> {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  return request<TransactionsResponse>({
    url: '/v1/txs?offset=' + offset + '&limit=' + limit,
    method: 'get',
  });
};
