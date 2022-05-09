import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    lastBlockNum: 0,
    HomeBlockInfoList: [],
    HomeTransactionInfoList: [],
  },
  // mutations: {
  //   setLastBlockNum(state, payload) {
  //     state.lastBlockNum = payload.number;
  //   },
  // },
});
export default store;
