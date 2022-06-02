<template lang="">
  <div class="container">
    <h3 style="display: inline">Transactions Details</h3>
    <!-- <p style="display: inline; margin-left: 1%">#{{ txHash }}</p> -->
    <el-tabs v-model="activeName" style="">
      <el-tab-pane label="Overview" name="first">
        <transaction-overview :txHashArg="transactionOverviewHash"></transaction-overview>
      </el-tab-pane>
      <el-tab-pane v-if="this.logCount != 0" name="second">
        <template #label>
          <span>Logs({{ logCount }})</span>
        </template>
        <transaction-logs :data="transactionLogsData"></transaction-logs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetLogsByTxHash } from "../../js/request.js";
export default defineComponent({
  name: "TransactionInfo",
  props: ["txHash"],
  data() {
    return {
      activeName: "first",
      logCount: 0,
      transactionOverviewHash: this.txHash,
      transactionLogsData: { txHash: this.txHash, logs: [] },
    };
  },
  watch: {
    $route(to) {
      if (to.params.txHash) {
        this.transactionOverviewHash = to.params.txHash;
        this.getLogsByTxHash(to.params.txHash);
      }
    },
  },
  created() {
    this.getLogsByTxHash(this.txHash);
  },
  beforeCreate() {
    document.title = "Transaction Hash Details | The Coq Explorer";
  },
  methods: {
    async getLogsByTxHash(txHash) {
      let res = await GetLogsByTxHash(this.$rpc_http, txHash);
      this.logCount = res.total;
      this.transactionLogsData.logs = res.items;
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
