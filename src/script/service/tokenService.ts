import request from './request';
import { TokenTransfers } from '../model/token';
import { ResponseType, TransactionsResponse } from '../model/index';
import { TokenHoldersResponse } from '../model/index';

export const GetTokenTransfersByAddress = function (address: string): Promise<ResponseType<TokenTransfers>> {
  return request<TokenTransfers>({
    url: '/v1/tokens/' + address + '/type',
    method: 'get',
  });
};

export const GetTokenHoldersByAddress = function (
  address: string,
  type: string,
  pageNumber: number,
  pageSize: number
): Promise<ResponseType<TokenHoldersResponse>> {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  return request<TokenHoldersResponse>({
    url: '/v1/tokens/' + address + '/holders?type=' + type + '&offset=' + offset + '&limit=' + limit,
    method: 'get',
  });
};

export const GetTransactionsByToken = function (
  address: string,
  type: string,
  pageNumber: number,
  pageSize: number
): Promise<ResponseType<TransactionsResponse>> {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  const url = '/v1/tokens/' + address + '/transfers' + '?type=' + type + '&offset=' + offset + '&limit=' + limit;
  return request<TransactionsResponse>({
    url: url,
    method: 'get',
  });
};
