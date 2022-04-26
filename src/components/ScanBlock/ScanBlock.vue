<template lang="">
  <div class="block-container">
    <el-table :data="tableData" style="width: 90%">
      <el-table-column prop="blockNumber" label="Latest Blocks" width="180" />
      <el-table-column prop="txInfo" width="180" />
      <el-table-column>
        <template v-slot:default="scope">
          <div style="text-align: right">
            {{ scope.row.blockReward }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mockGetBlockList } from "../../js/block.js";

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
.block-container {
  flex-basis: 40%;
}
.last-column {
  text-align: right;
}
</style>
