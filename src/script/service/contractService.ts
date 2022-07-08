import request from './request';
import { VerifyContractMetadata } from '../model/contract';
import { ResponseType } from '../model/index';

export const GetVerifyContractMetadata = function (): Promise<ResponseType<VerifyContractMetadata>> {
  return request<VerifyContractMetadata>({
    url: '/v1/contracts/metadata',
    method: 'get',
  });
};

export const GetVerifyContractStatus = function (submitId: string): Promise<ResponseType<any>> {
  return request<any>({
    url: '/v1/contracts-verify/' + submitId + '/status',
    method: 'get',
  });
};

export const SubmitVerifyContract = function (address: string, params: any): Promise<ResponseType<any>> {
  return request<any>({
    url: '/v1/contracts/' + address + '/verify',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data: params,
  });
};
