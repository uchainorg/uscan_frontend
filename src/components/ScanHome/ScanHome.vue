<template lang="">
  <div class="container-display">
    <scan-block></scan-block>
    <scan-transaction></scan-transaction>
  </div>
</template>
<script>
import { getBlockList } from "../../js/block.js";
export default {
  name: "ScanHome",
  created() {
    this.getBlockListRes();
  },
  methods: {
    async getBlockListRes() {
      let res = await getBlockList(this.$rpc_http);
      this.$store.state.lastBlockNum = res[0];
      this.$store.state.HomeBlockInfoList = res[1];
      this.$store.state.HomeTransactionInfoList = res[2];
    },
  },
};
</script>
<style lang="less" scoped>
.container-display {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}
</style>
