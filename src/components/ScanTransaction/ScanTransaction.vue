<template lang="">
  <div class="block-container">
    <el-table :data="this.$store.state.HomeTransactionInfoList" style="width: 95%" empty-text="loading...">
      <el-table-column label="Latest Transactions" width="190">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>
              <router-link :to="'/'">{{ scope.row.transactionHash }}</router-link>
            </div>
            <div>{{ scope.row.diffTime }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="250">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>
              From <router-link :to="'/'">{{ scope.row.from }}</router-link>
            </div>
            <div>
              To <router-link :to="'/'">{{ scope.row.to }}</router-link>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <el-tooltip class="box-item" effect="dark" content="value" placement="right">
            <div style="text-align: right">
              <el-tag type="info">{{ scope.row.transactionAmount }} wei</el-tag>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" plain style="width: 95%; margin-top: 1%">View all Transactions</el-button>
  </div>
</template>
<script>
import { mockGetTransactionList } from "../../js/mock.js";

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
