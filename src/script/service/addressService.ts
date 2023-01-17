import request from './request';
import { ResponseType } from '../model/index';
import { AddressDetail, AddressTxsTotal } from '../model/address';

export const GetAddressInfo = function (address: string): Promise<ResponseType<AddressDetail>> {
  return request<AddressDetail>({
    url: '/accounts/' + address,
    method: 'get',
  });
};

export const GetAddressTxsTotal = function (address: string): Promise<ResponseType<AddressTxsTotal>> {
  return request<AddressTxsTotal>({
    url: '/accounts/' + address +'/total',
    method: 'get',
  });
};
