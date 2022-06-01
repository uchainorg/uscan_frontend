<template lang="">
  <div class="container-display">
    <el-row :gutter="20">
      <el-col :span="12"><scan-block></scan-block></el-col>
      <el-col :span="12"><scan-transaction></scan-transaction></el-col>
    </el-row>
  </div>
</template>
<script>
import { GetHomeInfo } from "../../js/request";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScanHome",
  watch: {
    $route() {
      this.$store.state.headerName = "scan-header-info";
    },
  },
  created() {
    this.getBlockListRes();
  },
  beforeCreate() {
    document.title = "Home | The Coq Explorer";
    this.$store.state.headerName = "scan-header";
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
<style lang="less" scoped></style>
