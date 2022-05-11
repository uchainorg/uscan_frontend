<template lang="">
  <div class="container">
    <h3 style="display: inline">Transactions Details</h3>
    <!-- <p style="display: inline; margin-left: 1%">#{{ txHash }}</p> -->
    <el-tabs v-model="activeName" style="">
      <el-tab-pane label="Overview" name="first">
        <transaction-overview :data="transactionOverviewData"></transaction-overview>
      </el-tab-pane>
      <el-tab-pane label="Comments" name="second">
        <transaction-comments :data="transactionCommentsData"></transaction-comments>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TransactionInfo",
  props: ["txHash"],
  data() {
    return {
      activeName: "first",
      transactionOverviewData: { txHash: this.txHash },
      transactionCommentsData: { txHash: this.txHash },
    };
  },
  // methods: {
  //   handleClick(tab) {
  //     console.log(tab);
  //   },
  // },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
