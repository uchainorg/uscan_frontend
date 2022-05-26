<template lang="">
  <div>
    <el-table :data="this.$store.state.HomeTransactionInfoList" empty-text="loading..." :row-style="{ height: '75px' }">
      <el-table-column label="Latest Transactions" width="210">
        <template v-slot:default="scope">
          <el-row>
            <el-col :span="12">
              <div class="list-icon-circle">
                <p style="font-size: 15px; font-weight: bold">Tx</p>
              </div>
            </el-col>
            <el-col :span="12" style="margin-left: -20%">
              <div class="table-column-row">
                <router-link :to="'/block/' + scope.row.blockNumber">{{ scope.row.blockNumber }}</router-link>
                <div>{{ scope.row.age }}</div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column width="250">
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>
              From <router-link :to="'/address/' + scope.row.from">{{ scope.row.from.slice(0, 19) + "..." }}</router-link>
            </div>
            <div>
              To <router-link :to="'/address/' + scope.row.to">{{ scope.row.to.slice(0, 19) + "..." }}</router-link>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <el-tooltip class="box-item" effect="dark" content="amount" placement="right">
            <div style="text-align: right">
              <el-tag type="info">{{ this.$wei2eth(scope.row.gas) }} Eth</el-tag>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center">
      <el-button type="primary" plain style="width: 95%; margin-top: 1%; border: 0" @click="moveToTxs">View all Transactions</el-button>
    </div>
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
  methods: {
    moveToTxs() {
      this.$router.push("/transactions");
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
