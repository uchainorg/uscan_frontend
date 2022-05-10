<template lang="">
  <div class="container">
    <h3 style="display: inline">Transactions</h3>
    <div>For Block {{ number }}</div>
    <el-table :data="tableDate" style="width: 100%" empty-text="loading...">
      <el-table-column label="Txn Hash"></el-table-column>
      <el-table-column label="Method"></el-table-column>
      <el-table-column label="Block"></el-table-column>
      <el-table-column label="Age"></el-table-column>
      <el-table-column label="From"></el-table-column>
      <el-table-column label="To"></el-table-column>
      <el-table-column label="Value"></el-table-column>
      <el-table-column label="Txn Fee"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "TransactionList",
  props: ["number"],
  data() {
    return {
      tableDate: [],
    };
  },
};
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
