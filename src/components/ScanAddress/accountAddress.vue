<template lang="">
  <div>
    <el-row>
      <el-col>
        <h4>Address : {{ address }}</h4>
      </el-col>
    </el-row>
    <div>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>Overview</span>
          </div>
        </template>
        <div class="card-content">
          <el-row>
            <el-col :span="10">Balance:</el-col>
            <el-col :span="14">{{ this.$wei2eth(this.info.balance) + " Eth" }}</el-col>
          </el-row>
        </div>
      </el-card>
    </div>

    <div style="margin-top: 2%">
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

        <el-tab-pane name="second">
          <template #label>
            <span>erc20 Transaction({{ erc20Total }})</span>
          </template>
          <general-txs :txsData="erc20TransactionsList" :headerData="erc20TransactionsHeaderList"></general-txs>
          <div style="margin-top: 1%; display: flex; justify-content: center">
            <el-pagination
              :currentPage="erc20CurrentPage"
              :page-size="erc20PageSize"
              :page-sizes="[10, 25, 50, 100]"
              :pager-count="5"
              :small="small"
              layout="total, sizes, prev, pager, next, jumper"
              :total="erc20Total"
              @size-change="GeneralHandleSizeChange"
              @current-change="GeneralHandleCurrentChange"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane name="third">
          <template #label>
            <span>erc721 Transaction({{ erc721Total }})</span>
          </template>
          <general-txs :txsData="erc721TransactionsList" :headerData="erc721TransactionsHeaderList"></general-txs>
          <div style="margin-top: 1%; display: flex; justify-content: center">
            <el-pagination
              :currentPage="erc721CurrentPage"
              :page-size="erc721PageSize"
              :page-sizes="[10, 25, 50, 100]"
              :pager-count="5"
              :small="small"
              layout="total, sizes, prev, pager, next, jumper"
              :total="erc721Total"
              @size-change="GeneralHandleSizeChange"
              @current-change="GeneralHandleCurrentChange"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane name="fourth">
          <template #label>
            <span>erc1155 Transaction({{ erc1155Total }})</span>
          </template>
          <general-txs :txsData="erc1155TransactionsList" :headerData="erc1155TransactionsHeaderList"></general-txs>
          <div style="margin-top: 1%; display: flex; justify-content: center">
            <el-pagination
              :currentPage="erc1155CurrentPage"
              :page-size="erc1155PageSize"
              :page-sizes="[10, 25, 50, 100]"
              :pager-count="5"
              :small="small"
              layout="total, sizes, prev, pager, next, jumper"
              :total="erc1155Total"
              @size-change="GeneralHandleSizeChange"
              @current-change="GeneralHandleCurrentChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetTxsByAddress, GetTxsByErcAccount } from "../../js/request.js";
export default defineComponent({
  name: "accountAddress",
  props: ["address", "info"],
  data() {
    return {
      activeName: "transactions",
      addressOverview: {
        balance: 0,
      },
      small: true,
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
      generalTotal: 0,

      erc20TransactionsList: [],
      erc20TransactionsHeaderList: [
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
          label: "Value(token)",
          key: "valueToken",
        },
      ],
      erc20CurrentPage: 1,
      erc20PageSize: 25,
      erc20Total: 0,

      erc721TransactionsList: [],
      erc721TransactionsHeaderList: [
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
          label: "TokenID",
          key: "tokenID",
        },
      ],
      erc721CurrentPage: 1,
      erc721PageSize: 25,
      erc721Total: 0,

      erc1155TransactionsList: [],
      erc1155TransactionsHeaderList: [
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
          label: "TokenID",
          key: "tokenID",
        },
      ],
      erc1155CurrentPage: 1,
      erc1155PageSize: 25,
      erc1155Total: 0,
    };
  },
  created() {
    this.getGeneralTransactionsList();
    this.getErc20Txs();
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
    async getErc20Txs() {
      let erc20txns = await GetTxsByErcAccount(this.$rpc_http, "erc20", this.address, this.erc20CurrentPage - 1, this.erc20PageSize);
      this.erc20Total = erc20txns.total;
      this.erc20TransactionsList = erc20txns.resList;
      console.log(erc20txns);
      let erc721txns = await GetTxsByErcAccount(this.$rpc_http, "erc721", this.address, this.erc20CurrentPage - 1, this.erc20PageSize);
      this.erc721Total = erc721txns.total;
      this.erc721TransactionsList = erc721txns.resList;
      console.log(erc721txns);
      let erc1155txns = await GetTxsByErcAccount(this.$rpc_http, "erc1155", this.address, this.erc20CurrentPage - 1, this.erc20PageSize);
      this.erc1155Total = erc1155txns.total;
      this.erc1155TransactionsList = erc1155txns.resList;
      console.log(erc1155txns);
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
