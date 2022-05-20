<template lang="">
  <div class="block-container">
    <el-table :data="this.$store.state.HomeBlockInfoList" style="width: 95%" empty-text="loading...">
      <el-table-column label="Latest Blocks" width="190">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <router-link :to="'/block/' + scope.row.blockNumber">{{ scope.row.blockNumber }}</router-link>
            <div>{{ scope.row.diffTime }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>
              Miner <router-link :to="'/'"> {{ scope.row.miner.slice(0, 19) + "..." }} </router-link>
            </div>
            <el-tooltip class="box-item" effect="dark" content="Transactions in this block" placement="right">
              <div style="width: 60px">
                <router-link :to="'/block/txs/' + scope.row.blockNumber">{{ scope.row.txCount }} txns</router-link>
              </div>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <el-tooltip class="box-item" effect="dark" content="gasUsed" placement="right">
            <div style="text-align: right">
              <el-tag type="info">{{ this.$wei2eth(scope.row.gasUsed) }} Eth</el-tag>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" plain style="width: 95%; margin-top: 1%">View all Blocks</el-button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScanBlock",
  created() {
    this.getBlockListRes();
  },
  methods: {
    getBlockListRes() {
      this.tableData = this.$store.state.HomeBlockInfoList;
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
