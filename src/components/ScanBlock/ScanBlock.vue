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
      <el-table-column width="300">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>
              Miner <router-link :to="'/'">{{ scope.row.miner }}</router-link>
            </div>
            <el-tooltip class="box-item" effect="dark" content="Transactions in this block" placement="right">
              <div style="width: 45px">
                <router-link :to="'/'">{{ scope.row.txCount }} txns</router-link>
              </div>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <el-tooltip class="box-item" effect="dark" content="gasUsed" placement="right">
            <div style="text-align: right">{{ scope.row.gasUsed }} Eth</div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getBlockList } from "../../js/block.js";
export default {
  name: "ScanBlock",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getBlockListRes();
  },
  methods: {
    async getBlockListRes() {
      let res = await getBlockList(this.$rpc_http);
      this.$store.state.lastBlockNum = res[0];
      this.tableData = res[1];
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
