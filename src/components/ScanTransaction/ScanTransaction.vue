<template lang="">
  <div class="block-container">
    <el-table :data="this.$store.state.HomeTransactionInfoList" style="width: 95%" empty-text="loading...">
      <el-table-column label="Latest Transactions" width="190">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>
              <router-link :to="'/tx/' + scope.row.transactionHash">{{
                scope.row.transactionHash.slice(0, 15) + "..."
              }}</router-link>
            </div>
            <div>{{ scope.row.diffTime }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="250">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>
              From <router-link :to="'/'">{{ scope.row.from.slice(0, 19) + "..." }}</router-link>
            </div>
            <div>
              To <router-link :to="'/'">{{ scope.row.to.slice(0, 19) + "..." }}</router-link>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <el-tooltip class="box-item" effect="dark" content="amount" placement="right">
            <div style="text-align: right">
              <el-tag type="info">{{ this.$wei2eth(scope.row.transactionAmount) }} Eth</el-tag>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" plain style="width: 95%; margin-top: 1%">View all Transactions</el-button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScanTransaction",
  data() {
    return {
      tableData: [],
    };
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
