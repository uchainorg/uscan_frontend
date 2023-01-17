import request from './request';
import { VerifyContractMetadata } from '../model/contract';
import { ResponseType, ContractsResponse, ContractContentRes } from '../model/index';

export const GetVerifyContractMetadata = function (): Promise<ResponseType<VerifyContractMetadata>> {
  return request<VerifyContractMetadata>({
    url: '/contracts/metadata',
    method: 'get',
  });
};

export const GetVerifyContractStatus = function (submitId: string): Promise<ResponseType<any>> {
  return request<any>({
    url: '/contracts-verify/' + submitId + '/status',
    method: 'get',
  });
};

export const SubmitVerifyContract = function (address: string, params: any): Promise<ResponseType<any>> {
  return request<any>({
    url: '/contracts/' + address + '/verify',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data: params,
  });
};

export const GetVerifyContractContent = function (address: string): Promise<ResponseType<ContractContentRes>> {
  return request<ContractContentRes>({
    url: '/contracts/' + address + '/content',
    method: 'get',
  });
};

export const GetContracts = function (
  type: string,
  pageNumber: number,
  pageSize: number
): Promise<ResponseType<ContractsResponse>> {
  let typeInt = 1;
  switch (type) {
    case 'erc20':
      typeInt = 1;
      break;
    case 'erc721':
      typeInt = 2;
      break;
  }
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  const url = '/accounts?type=' + typeInt + '&offset=' + offset + '&limit=' + limit;
  return request<ContractsResponse>({
    url: url,
    method: 'get',
  });
};
