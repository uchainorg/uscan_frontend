import { diffTime } from "./utils.js";

export async function GetBlockList(http, pageNumber, pageSize) {
  let offset = pageNumber * pageSize - 1;
  let limit = pageSize;
  let url = "/v1/blocks?offset=" + offset + "&limit=" + limit;
  let { data: res } = await http.get(url);
  let blockListRes = [];
  res.data.items.forEach((element) => {
    let createTimeBk = new Date(parseInt(element.createdTime)) * 1000;
    blockListRes.push({
      blockNumber: parseInt(element.number),
      age: diffTime(createTimeBk, new Date()),
      txn: element.transactions.length,
      gasUsed: parseInt(element.gasUsed),
      gasLimit: parseInt(element.gasLimit),
      baseFee: 0,
      miner: element.miner,
    });
  });

  let result = {
    resList: blockListRes,
    total: res.data.total,
  };
  // console.log(result);
  return result;
}

export async function GetTransactionsList(http, pageNumber, pageSize) {
  let offset = pageNumber * pageSize - 1;
  let limit = pageSize;
  let url = "/v1/txs?offset=" + offset + "&limit=" + limit;
  let { data: res } = await http.get(url);
  let txsListRes = [];
  res.data.items.forEach((element) => {
    let createTimeTx = new Date(parseInt(element.createTime)) * 1000;
    // console.log(element);
    txsListRes.push({
      hash: element.hash,
      method: element.method,
      blockNumber: parseInt(element.blockNumber),
      age: diffTime(createTimeTx, new Date()),
      from: element.from,
      to: element.to,
      value: element.value,
      gas: parseInt(element.gas * element.gasPrice),
    });
  });
  let result = {
    resList: txsListRes,
    total: res.data.total,
  };
  // console.log(result);
  return result;
}

export async function GetHomeInfo(http) {
  let resBlocks = await GetBlockList(http, 0, 10);
  let blockListRes = resBlocks.resList;
  let resTxs = await GetTransactionsList(http, 0, 10);
  let transactionList = resTxs.resList;

  let result = {
    blockList: blockListRes,
    txsList: transactionList,
  };
  // console.log(result);
  return result;
}

export async function GetBlockByNumber(http, blockNumber) {
  let url = "/v1/blocks/" + blockNumber;
  let { data: res } = await http.get(url);
  // console.log(res.data);
  return res.data;
}

export async function GetTxsByBlock(http, blockNumber) {
  let url = "/v1/txs?blockBegin=" + blockNumber + "&blockEnd=" + blockNumber;
  let { data: res } = await http.get(url);
  // console.log(res.data.items);
  return res.data.items;
}

export async function GetTxByHash(http, hash) {
  let url = "/v1/txs/" + hash;
  let { data: res } = await http.get(url);
  return res.data;
}

export async function GetAddressInfo(http, hash) {
  let url = "/v1/accounts/" + hash;
  let { data: res } = await http.get(url);
  return res.data;
}

export async function GetTxsByContract(http, hash, pageNumber, pageSize) {
  let offset = pageNumber * pageSize - 1;
  let limit = pageSize;
  let url = "/v1/accounts/" + hash + "/txns?offset=" + offset + "&limit=" + limit;
  let { data: res } = await http.get(url);
  let txsListRes = [];
  res.data.items.forEach((element) => {
    let createTimeTx = new Date(parseInt(element.createTime)) * 1000;
    // console.log(element);
    txsListRes.push({
      hash: element.hash,
      method: element.method,
      blockNumber: parseInt(element.blockNumber),
      age: diffTime(createTimeTx, new Date()),
      from: element.from,
      to: element.to,
      value: element.value,
      gas: parseInt(element.gas * element.gasPrice),
    });
  });
  let result = {
    resList: txsListRes,
    total: res.data.total,
  };
  // console.log(result);
  return result;
}
