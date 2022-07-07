import request from './request';
import { ResponseType, TransactionsResponse } from '../model/index';
import { TransactionDetail } from '../model/transaction';

export const GetTransactions = function (
  pageNumber: number,
  pageSize: number,
  type: string
): Promise<ResponseType<TransactionsResponse>> {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  let url = '';
  if (type === 'all') {
    url = '/v1/txs?offset=' + offset + '&limit=' + limit;
  } else {
    url = '/v1/tokens/txns/' + type + '?offset=' + offset + '&limit=' + limit;
  }
  return request<TransactionsResponse>({
    url: url,
    method: 'get',
  });
};

export const GetTransactionsByAddress = function (
  pageNumber: number,
  pageSize: number,
  type: string,
  address: string
): Promise<ResponseType<TransactionsResponse>> {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  let url = '';
  if (type === 'txs') {
    url = '/v1/accounts/' + address + '/txns?offset=' + offset + '&limit=' + limit;
  } else {
    url = '/v1/accounts/' + address + '/txns-' + type + '?offset=' + offset + '&limit=' + limit;
  }
  return request<TransactionsResponse>({
    url: url,
    method: 'get',
  });
};

export const GetTxByHash = function (txHash: string): Promise<ResponseType<TransactionDetail>> {
  return request<TransactionDetail>({
    url: '/v1/txs/' + txHash,
    method: 'get',
  });
};
