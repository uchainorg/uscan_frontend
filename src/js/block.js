import { diffTime } from "./utils.js";

async function getLastBlockNum(http) {
  let { data: res } = await http.post("", { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 });
  return parseInt(res.result);
}

async function getBlockListByRpc(http, lastBlockNum) {
  let requestList = [];
  let resList = [];
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
    resList.push({
      blockNumber: parseInt(element.result.number),
      diffTime: diffTime(createTime, new Date()),
      txCount: element.result.transactions.length,
      gasUsed: parseInt(element.result.gasUsed),
      miner: element.result.miner.slice(0, 19) + "...",
    });
  });
  return resList;
}

export async function getBlockList(http) {
  let lastBlockNum = await getLastBlockNum(http);
  let res = await getBlockListByRpc(http, lastBlockNum);
  return [lastBlockNum, res];
}
