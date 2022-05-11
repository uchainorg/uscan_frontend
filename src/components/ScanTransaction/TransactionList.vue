<template lang="">
  <div class="container">
    <h3 style="display: inline">Transactions</h3>
    <div>For Block {{ number }}</div>
    <el-table :data="tableDate" style="width: 100%" empty-text="loading...">
      <el-table-column label="Txn Hash" width="190">
        <template v-slot:default="scope">
          <div>{{ scope.row.hash.slice(0, 19) + "..." }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Method" width="130">
        <template v-slot:default="scope">
          <div>{{ scope.row.method }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Block" width="130">
        <div>
          <router-link :to="'/block/' + this.number">{{ number }}</router-link>
        </div>
      </el-table-column>
      <el-table-column label="Age" width="130">
        <template v-slot:default="scope">
          <el-tooltip class="box-item" effect="dark" placement="top">
            <template #content> {{ scope.row.ageFormat }} </template>
            <div>{{ scope.row.age }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="From" width="190">
        <template v-slot:default="scope">
          <div>{{ scope.row.from.slice(0, 19) + "..." }}</div>
        </template>
      </el-table-column>
      <el-table-column label="To" width="190">
        <template v-slot:default="scope">
          <div>{{ scope.row.to.slice(0, 19) + "..." }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Value">
        <template v-slot:default="scope">
          <div>{{ parseInt(scope.row.value) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Txn Fee">
        <template v-slot:default="scope">
          <div>{{ parseInt(scope.row.gas) }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { getBlock } from "../../js/block.js";
import { diffTime } from "../../js/utils.js";
export default defineComponent({
  name: "TransactionList",
  props: ["number"],
  data() {
    return {
      tableDate: [],
    };
  },
  created() {
    this.getTransactionList();
  },
  methods: {
    async getTransactionList() {
      let res = await getBlock(this.$rpc_http, this.number);
      res.transactions.slice(0, 50).forEach((tx) => {
        (tx.method = "test-method"), (tx.age = diffTime(new Date(parseInt(res.timestamp)) * 1000, new Date())), (tx.ageFormat = new Date(parseInt(res.timestamp) * 1000).toUTCString());
        this.tableDate.push(tx);
      });
      console.log(this.tableDate);
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
