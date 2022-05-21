import { diffTime } from "./utils.js";

async function getBlockList(http, offset, limit) {
  let url = "/v1/blocks?offset=" + offset + "&limit=" + limit;
  let { data: res } = await http.get(url);
  let result = {
    resList: res.data.items,
    total: res.data.total,
  };
  return result;
}

export async function GetBlockList(http, offset, limit) {
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

async function getTransactionsList(http, offset, limit) {
  let url = "/v1/txs?offset=" + offset + "&limit=" + limit;
  let { data: res } = await http.get(url);
  let result = {
    resList: res.data.items,
    total: res.data.total,
  };
  return result;
}

export async function GetTransactionsList(http, offset, limit) {
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
  let blockListRes = [];
  let transactionList = [];
  let blockRes = await getBlockList(http, 0, 10);
  // blockList = blockRes.resList;
  let txsRes = await getTransactionsList(http, 0, 10);
  // transactionList = txsRes.resList;
  blockRes.resList.forEach((element) => {
    // console.log(element);
    let createTimeBk = new Date(parseInt(element.createdTime)) * 1000;
    blockListRes.push({
      blockNumber: parseInt(element.number),
      diffTime: diffTime(createTimeBk, new Date()),
      txCount: element.transactions.length,
      gasUsed: parseInt(element.gasUsed),
      miner: element.miner,
    });
  });

  txsRes.resList.forEach((element) => {
    let createTimeTx = new Date(parseInt(element.createTime)) * 1000;
    // console.log(element);
    transactionList.push({
      transactionHash: element.hash,
      diffTime: diffTime(createTimeTx, new Date()),
      from: element.from,
      to: element.to,
      transactionAmount: parseInt(element.gas * element.gasPrice),
    });
  });

  let result = {
    blockList: blockListRes,
    txsList: transactionList,
  };

  return result;
}
