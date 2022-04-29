<template lang="">
  <div class="block-container">
    <el-table :data="tableData" style="width: 95%">
      <el-table-column label="Latest Blocks" width="180">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <router-link :to="'/block/' + scope.row.blockNumber">{{ scope.row.blockNumber }}</router-link>
            <div>{{ scope.row.diffTime }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>Miner {{ scope.row.miner }}</div>
            <div>{{ scope.row.txCount }} txns</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <div style="text-align: right">{{ scope.row.blockReward }} Eth</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mockGetBlockList } from "../../js/mock.js";
export default {
  name: "ScanBlock",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.loadBlockList();
  },
  methods: {
    loadBlockList() {
      this.tableData = mockGetBlockList();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
