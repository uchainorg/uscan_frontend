<template lang="">
  <div class="container-display">
    <scan-block></scan-block>
    <scan-transaction></scan-transaction>
  </div>
</template>
<script>
import { GetHomeInfo } from "../../js/request";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScanHome",
  created() {
    this.getBlockListRes();
  },
  methods: {
    async getBlockListRes() {
      let res = await GetHomeInfo(this.$rpc_http);
      this.$store.state.HomeBlockInfoList = res.blockList;
      this.$store.state.HomeTransactionInfoList = res.txsList;
    },
  },
});
</script>
<style lang="less" scoped>
.container-display {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}
</style>
