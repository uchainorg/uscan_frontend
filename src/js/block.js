export async function getLastBlockNum(http) {
  let { data: res } = await http.post("", { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 });
  return parseInt(res.result);
}

// export async function getBlockList(http, lastBlockNum) {
//   let resList = [];
//   for (let i = 10; i > 0; i--) {}
// }
