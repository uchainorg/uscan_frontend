import { diffTime } from "./utils.js";

let blockNumber = 14646688;

export function mockGetBlockList() {
  let resList = [];

  for (var i = 10; i > 0; i--) {
    let createTime = new Date() - 1000 * 60 * (10 - i);
    resList.push({
      blockNumber: blockNumber + i,
      timeStamp: createTime,
      diffTime: diffTime(createTime, new Date()),
      miner: "miner1",
      txCount: 33,
      blockReward: 2.14802,
    });
  }

  return resList;
}

export function mockGetTransactionList() {
  let resList = [];

  for (var i = 10; i > 0; i--) {
    let createTime = new Date() - 1000 * 60 * (10 - i);
    resList.push({
      transactionHash: "0xdfd0991e1653...",
      timeStamp: createTime,
      diffTime: diffTime(createTime, new Date()),
      from: "0x0a4a50ff59a5dc4bc47...",
      to: "0x0a4a50ff59a5dc4bc47...",
      transactionAmount: 2.14802,
    });
  }

  return resList;
}

export function mockUpdateBlock(blockList) {
  let newBlock = {};
  let lastBlock = blockList[0];
  // pop last block
  blockList.pop();
  // create new block
  newBlock = {
    blockNumber: lastBlock.blockNumber + 1,
    timeStamp: new Date() - 1000 * 60,
    diffTime: diffTime(new Date() - 1000, new Date()),
    miner: "miner2",
    txCount: 66,
    blockReward: 3.14802,
  };
  // add new block
  blockList.splice(0, 0, newBlock);
}
