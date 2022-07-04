import request from './http';

export const GetBlocks = () => {
  return request({
    url: '/v1/blocks?offset=0&limit=10',
    method: 'get',
  });
};
