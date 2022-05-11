import { diffTime } from "./utils.js";

async function getLastBlockNum(http) {
  let { data: res } = await http.post("", { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 });
  return parseInt(res.result);
}

// async function getTransactionListByRpc(http, transactionHashList) {
//   transactionHashList.
// }

async function getBlockListByRpc(http, lastBlockNum) {
  let requestList = [];
  let blockList = [];
  let transactionList = [];
  let getTransactionFlag = false;
  for (let i = 0; i < 10; i++) {
    let blockNumHex = "0x" + (lastBlockNum - i).toString(16);
    requestList.push({
      jsonrpc: "2.0",
      method: "eth_getBlockByNumber",
      params: [blockNumHex, true],
      id: 1,
    });
  }
  let { data: res } = await http.post("", requestList);
  res.forEach((element) => {
    // console.log("res for each", element.result);
    let createTime = new Date(parseInt(element.result.timestamp)) * 1000;
    blockList.push({
      blockNumber: parseInt(element.result.number),
      diffTime: diffTime(createTime, new Date()),
      txCount: element.result.transactions.length,
      gasUsed: parseInt(element.result.gasUsed),
      miner: element.result.miner.slice(0, 19) + "...",
    });
    if (!getTransactionFlag) {
      if (element.result.transactions.length > 10) {
        element.result.transactions.slice(0, 10).forEach((tx) => {
          // console.log("res for each", tx);
          transactionList.push({
            transactionHash: tx.hash,
            diffTime: diffTime(createTime, new Date()),
            from: tx.from.slice(0, 19) + "...",
            to: tx.to.slice(0, 19) + "...",
            transactionAmount: parseInt(tx.value),
          });
        });
        getTransactionFlag = true;
      }
    }
  });
  // console.log("transactionRes", transactionList);
  return [blockList, transactionList];
}

export async function getBlockList(http) {
  let lastBlockNum = await getLastBlockNum(http);
  let res = await getBlockListByRpc(http, lastBlockNum);
  return [lastBlockNum, res[0], res[1]];
}

export async function getBlock(http, blockNumber) {
  let blockNumHex = "0x" + parseInt(blockNumber).toString(16);
  let { data: res } = await http.post("", {
    jsonrpc: "2.0",
    method: "eth_getBlockByNumber",
    params: [blockNumHex, true],
    id: 1,
  });
  return res.result;
}

export async function getTransaction(http, txHash) {
  let { data: res } = await http.post("", {
    jsonrpc: "2.0",
    method: "eth_getTransactionByHash",
    params: [txHash],
    id: 1,
  });
  return res.result;
}
