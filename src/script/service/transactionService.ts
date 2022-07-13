import request from './request';
import { ResponseType, TransactionsResponse, TransactionLogResponse } from '../model/index';
import { TransactionDetail } from '../model/transaction';

export const GetTransactions = function (
  pageNumber: number,
  pageSize: number,
  type: string,
  blockNumber: number
): Promise<ResponseType<TransactionsResponse>> {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  let url = '';
  if (blockNumber !== -1) {
    url = '/v1/txs?blockBegin=' + blockNumber + '&blockEnd=' + blockNumber + '&offset=' + offset + '&limit=' + limit;
  } else if (type === 'all') {
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

export const GetTransactionsByToken = function (
  pageNumber: number,
  pageSize: number,
  type: string,
  address: string
): Promise<ResponseType<TransactionsResponse>> {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  const url = '/v1/tokens/txns/' + type + '?contract=' + address + '&offset=' + offset + '&limit=' + limit;
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

export const GetBaseTxByHash = function (txHash: string): Promise<ResponseType<TransactionDetail>> {
  return request<TransactionDetail>({
    url: '/v1/txs/' + txHash + '/base',
    method: 'get',
  });
};

export const GetTxLog = function (txHash: string): Promise<ResponseType<TransactionLogResponse>> {
  return request<TransactionLogResponse>({
    url: '/v1/txs/' + txHash + '/event-logs',
    method: 'get',
  });
};
