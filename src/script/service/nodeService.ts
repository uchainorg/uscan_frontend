import axios from 'axios';
import { getNodeUrl } from '../../script/global';


export const GetResByNode = async (requestList: any[]) => {
  console.log('getNodeUrl', getNodeUrl());
  if (getNodeUrl() !== '') {
    const requestNode = axios.create({
      baseURL: getNodeUrl() as string,
    });
    const reqs: any = [];
    const responseMap = new Map();
    let requestId = 0;
    requestList.forEach((element) => {
      reqs.push({
        jsonrpc: '2.0',
        method: element.method,
        params: element.params,
        id: requestId,
      });
      requestId += 1;
    });
    await requestNode.post('', reqs).then((res) => {
      res.data.forEach((element: any) => {
        // console.log(element);
        responseMap.set(element.id, element.result ? element.result : '');
      });
    });
    return responseMap;
  } else {
    alert('Please set the node address at startup');
  }
};
