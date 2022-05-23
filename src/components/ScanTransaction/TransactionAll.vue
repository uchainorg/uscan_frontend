<template lang="">
  <div class="container">
    <h3 style="display: inline">Transactions</h3>
    <general-txs :txsData="tableDate" :headerData="headerList"></general-txs>
    <div style="margin-top: 1%; display: flex; justify-content: center">
      <el-pagination
        :currentPage="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 25, 50, 100]"
        :pager-count="5"
        :small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import generalTxs from "../Transaction/generalTxs.vue";
import { GetTransactionsList } from "../../js/request";
import { GetTxsByERC } from "../../js/request";
export default defineComponent({
  name: "AllTransactionsList",
  components: { generalTxs },
  props: ["type"],
  data() {
    return {
      tableDate: [],
      currentPage: 1,
      pageSize: 25,
      small: true,
      total: 0,
      headerList: [],
    };
  },
  created() {
    if (this.type) {
      this.getTxsByERC();
      this.headerList = [
        {
          label: "Txn Hash",
          key: "hash",
        },
        {
          label: "Age",
          key: "age",
        },
        {
          label: "From",
          key: "from",
        },
        {
          label: "To",
          key: "to",
        },
        {
          label: "Value",
          key: "value",
        },
        {
          label: "Token",
          key: "token",
        },
      ];
    } else {
      this.getTxsList();
      this.headerList = [
        {
          label: "Txn Hash",
          key: "hash",
        },
        {
          label: "Method",
          key: "method",
        },
        {
          label: "Block",
          key: "blockNumber",
        },
        {
          label: "Age",
          key: "age",
        },
        {
          label: "From",
          key: "from",
        },
        {
          label: "To",
          key: "to",
        },
        {
          label: "Value",
          key: "value",
        },
        {
          label: "Txn Fee",
          key: "gas",
        },
      ];
    }
  },
  methods: {
    async getTxsList() {
      let res = await GetTransactionsList(this.$rpc_http, this.currentPage - 1, this.pageSize);
      this.tableDate = res.resList;
      this.total = res.total;
    },
    async getTxsByERC() {
      let res = await GetTxsByERC(this.$rpc_http, this.type, this.currentPage - 1, this.pageSize);
      this.tableDate = res.resList;
      this.total = res.total;
    },
    async handleCurrentChange(val) {
      this.tableDate = [];
      this.currentPage = val;
      let res = await GetTransactionsList(this.$rpc_http, this.currentPage - 1, this.pageSize);
      this.tableDate = res.resList;
      this.total = res.total;
    },
    async handleSizeChange(val) {
      this.tableDate = [];
      this.currentPage = 1;
      this.pageSize = val;
      let res = await GetTransactionsList(this.$rpc_http, this.currentPage - 1, this.pageSize);
      this.tableDate = res.resList;
      this.total = res.total;
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
