export function mockGetBlockList() {
  let blockNumber = 14646688;
  let resList = [];

  for (var i = 0; i < 10; i++) {
    resList.push({
      blockNumber: blockNumber + i,
      txInfo: "338 txns in 18 secs",
      blockReward: "2.1242 Eth",
    });
  }

  return resList;
}
