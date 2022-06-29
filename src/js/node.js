export async function getResByNode(http, requestList) {
  let reqs = [];
  let responseMap = new Map();
  let requestId = 0;
  requestList.forEach((element) => {
    reqs.push({
      jsonrpc: "2.0",
      method: element.method,
      params: element.params,
      id: requestId,
    });
    requestId += 1;
  });
  // console.log(reqs);
  await http.post("", reqs).then((res) => {
    res.data.forEach((element) => {
      // console.log(element);
      responseMap.set(element.id, element.result ? element.result : "");
    });
  });
  return responseMap;
}
