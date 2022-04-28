<template lang="">
  <div class="block-container">
    <el-table :data="tableData" style="width: 95%">
      <el-table-column label="Latest Transactions" width="180">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>{{ scope.row.transactionHash }}</div>
            <div>{{ scope.row.diffTime }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="250">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>From {{ scope.row.from }}</div>
            <div>To {{ scope.row.to }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <div style="text-align: right">{{ scope.row.transactionAmount }} Eth</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mockGetTransactionList } from "../../js/block.js";

export default {
  name: "ScanTransaction",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.loadTransactionList();
  },
  methods: {
    loadTransactionList() {
      this.tableData = mockGetTransactionList();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
