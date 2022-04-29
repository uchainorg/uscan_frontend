<template lang="">
  <div class="header-container">
    <div class="header-title-container" :style="{ fontSize: fsize + 'px' }">
      {{ title }}
    </div>
    <div class="header-input-container">
      <el-link style="align-self: flex-start; margin-bottom: 4%" type="primary" @click="moveToHome">Home</el-link>
      <div style="align-self: flex-start; margin-bottom: 4%">Last Block Number : {{ lastBlockNumber }}</div>
      <el-input style="width: 100%" v-model.trim="search_data" placeholder="Search by Address / Txhash / Block / Token / Ens"> </el-input>
    </div>
  </div>
</template>
<script>
export default {
  name: "ScanHeader",
  props: {
    title: {
      type: String,
      default: "ankr chain scan",
    },
    fsize: {
      type: Number,
      default: 35,
    },
  },
  data() {
    return {
      search_data: "",
      lastBlockNumber: 0,
      updateBlockWorker: "",
    };
  },
  watch: {
    search_data(newVal) {
      console.log(newVal);
    },
  },
  created() {
    this.getLastBlock();
  },
  mounted() {
    this.updateBlockWorker = setInterval(this.getLastBlock, 1000);
  },
  beforeDestroy() {
    clearInterval(this.updateBlockWorker);
  },
  methods: {
    moveToHome() {
      this.$router.push("/");
    },
    async getLastBlock() {
      const { data: res } = await this.$http.post("", { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 });
      this.lastBlockNumber = parseInt(res.result);
    },
  },
};
</script>
<style lang="less" scoped>
.header-container {
  display: flex;
  margin-top: 50px;
  justify-content: center;
}

.header-title-container {
  width: 30%;
  font-family: "Gill Sans", Times, serif;
  margin-top: 2%;
}

.header-input-container {
  width: 30%;
  display: flex;
  flex-direction: column;
}
</style>
