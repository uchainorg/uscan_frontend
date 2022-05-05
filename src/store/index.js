import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    lastBlockNum: 0,
  },
  mutations: {
    setLastBlockNum(state, payload) {
      state.lastBlockNum = payload.number;
    },
  },
});
export default store;
