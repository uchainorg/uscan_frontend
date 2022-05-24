<template lang="">
  <div>
    <h3 style="display: inline">Address</h3>
    &nbsp;
    <p style="display: inline">{{ address }}</p>
    <div class="container-display">
      <div style="width: 50%">
        <h4>Overview</h4>
        <el-table :data="addressOverviewTableData" style="margin-top: -3%; width: 95%" empty-text="loading...">
          <el-table-column prop="parameterDisplay"></el-table-column>
          <el-table-column prop="parameterValue">
            <template v-slot:default="scope"> {{ scope.row.parameterValue }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin-top: 3%">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="Transactions" name="transactions">
          <general-txs :txsData="generalTransactionsList" :headerData="generalTransactionsHeaderList"></general-txs>
          <div style="margin-top: 1%; display: flex; justify-content: center">
            <el-pagination
              :currentPage="generalCurrentPage"
              :page-size="generalPageSize"
              :page-sizes="[10, 25, 50, 100]"
              :pager-count="5"
              :small="small"
              layout="total, sizes, prev, pager, next, jumper"
              :total="generalTotal"
              @size-change="GeneralHandleSizeChange"
              @current-change="GeneralHandleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Comments" name="Comments"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetTxsByAddress } from "../../js/request.js";
export default defineComponent({
  name: "accountAddress",
  props: ["address", "info"],
  data() {
    return {
      activeName: "transactions",
      addressOverviewTableData: [],
      generalTransactionsList: [],
      generalTransactionsHeaderList: [
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
      ],
      generalCurrentPage: 1,
      generalPageSize: 25,
      small: true,
      generalTotal: 0,
    };
  },
  created() {
    if (this.addressOverviewTableData.length == 0) {
      this.addressOverviewTableData.push({
        parameterName: "balance",
        parameterDisplay: "Balance:",
        parameterValue: this.$wei2eth(this.info.balance) + " Eth",
      });
    }
    this.getGeneralTransactionsList();
  },
  methods: {
    async getGeneralTransactionsList() {
      let res = await GetTxsByAddress(this.$rpc_http, this.address, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
    },
    handleTabClick(tab) {
      console.log(tab.props);
    },
    async GeneralHandleCurrentChange(val) {
      this.tableDate = [];
      this.generalCurrentPage = val;
      let res = await GetTxsByAddress(this.$rpc_http, this.address, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
    },
    async GeneralHandleSizeChange(val) {
      this.tableDate = [];
      this.generalCurrentPage = 1;
      this.generalPageSize = val;
      let res = await GetTxsByAddress(this.$rpc_http, this.address, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
    },
  },
});
</script>
<style lang=""></style>
