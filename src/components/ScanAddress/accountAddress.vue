<template lang="">
  <div>
    <div class="center-row">
      <h4>Address : {{ address }}</h4>
      &nbsp;
      <copy-icon :text="this.address"></copy-icon>
    </div>
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
      <el-tabs v-model="activeName">
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

        <el-tab-pane v-if="this.erc20Total != 0" name="second">
          <template #label>
            <span>Erc20 Token Txns({{ erc20Total }})</span>
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
              @size-change="Erc20HandleSizeChange"
              @current-change="Erc20HandleCurrentChange"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane v-if="this.erc721Total != 0" name="third">
          <template #label>
            <span>Erc721 Token Txns({{ erc721Total }})</span>
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
              @size-change="Erc721HandleSizeChange"
              @current-change="Erc721HandleCurrentChange"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane v-if="this.erc1155Total != 0" name="fourth">
          <template #label>
            <span>Erc1155 Token Txns({{ erc1155Total }})</span>
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
              @size-change="Erc1155HandleSizeChange"
              @current-change="Erc1155HandleCurrentChange"
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
    this.getErcTxs();
  },
  beforeCreate() {
    document.title = "Address | The Coq Explorer";
  },
  watch: {
    async address(newVal) {
      this.tableDate = [];
      this.generalCurrentPage = 1;
      this.generalPageSize = 25;
      let res = await GetTxsByAddress(this.$rpc_http, newVal, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;

      this.erc20TransactionsList = [];
      this.erc20CurrentPage = 1;
      this.erc20PageSize = 25;
      let erc20txns = await GetTxsByErcAccount(this.$rpc_http, "erc20", newVal, this.erc20CurrentPage - 1, this.erc20PageSize);
      this.erc20Total = erc20txns.total;
      this.erc20TransactionsList = erc20txns.resList;

      this.erc721TransactionsList = [];
      this.erc721CurrentPage = 1;
      this.erc721PageSize = 25;
      let erc721txns = await GetTxsByErcAccount(this.$rpc_http, "erc721", this.address, this.erc721CurrentPage - 1, this.erc721PageSize);
      this.erc721Total = erc721txns.total;
      this.erc721TransactionsList = erc721txns.resList;

      this.erc1155TransactionsList = [];
      this.erc1155CurrentPage = 1;
      this.erc1155PageSize = 25;
      let erc1155txns = await GetTxsByErcAccount(this.$rpc_http, "erc1155", this.address, this.erc1155CurrentPage - 1, this.erc1155PageSize);
      this.erc1155Total = erc1155txns.total;
      this.erc1155TransactionsList = erc1155txns.resList;
    },
  },
  methods: {
    async getGeneralTransactionsList() {
      let res = await GetTxsByAddress(this.$rpc_http, this.address, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
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
    async Erc20HandleCurrentChange(val) {
      this.erc20TransactionsList = [];
      this.erc20CurrentPage = val;
      let erc20txns = await GetTxsByErcAccount(this.$rpc_http, "erc20", this.address, this.erc20CurrentPage - 1, this.erc20PageSize);
      this.erc20Total = erc20txns.total;
      this.erc20TransactionsList = erc20txns.resList;
    },
    async Erc20HandleSizeChange(val) {
      this.erc20TransactionsList = [];
      this.erc20CurrentPage = 1;
      this.erc20PageSize = val;
      let erc20txns = await GetTxsByErcAccount(this.$rpc_http, "erc20", this.address, this.erc20CurrentPage - 1, this.erc20PageSize);
      this.erc20Total = erc20txns.total;
      this.erc20TransactionsList = erc20txns.resList;
    },
    async Erc721HandleCurrentChange(val) {
      this.erc721TransactionsList = [];
      this.erc721CurrentPage = val;
      let erc721txns = await GetTxsByErcAccount(this.$rpc_http, "erc721", this.address, this.erc721CurrentPage - 1, this.erc721PageSize);
      this.erc721Total = erc721txns.total;
      this.erc721TransactionsList = erc721txns.resList;
    },
    async Erc721HandleSizeChange(val) {
      this.erc721TransactionsList = [];
      this.erc721CurrentPage = 1;
      this.erc721PageSize = val;
      let erc721txns = await GetTxsByErcAccount(this.$rpc_http, "erc721", this.address, this.erc721CurrentPage - 1, this.erc721PageSize);
      this.erc721Total = erc721txns.total;
      this.erc721TransactionsList = erc721txns.resList;
    },
    async Erc1155HandleCurrentChange(val) {
      this.erc1155TransactionsList = [];
      this.erc1155CurrentPage = val;
      let erc1155txns = await GetTxsByErcAccount(this.$rpc_http, "erc1155", this.address, this.erc1155CurrentPage - 1, this.erc1155PageSize);
      this.erc1155Total = erc1155txns.total;
      this.erc1155TransactionsList = erc1155txns.resList;
    },
    async Erc1155HandleSizeChange(val) {
      this.erc1155TransactionsList = [];
      this.erc1155CurrentPage = 1;
      this.erc1155PageSize = val;
      let erc1155txns = await GetTxsByErcAccount(this.$rpc_http, "erc1155", this.address, this.erc1155CurrentPage - 1, this.erc1155PageSize);
      this.erc1155Total = erc1155txns.total;
      this.erc1155TransactionsList = erc1155txns.resList;
    },
    async getErcTxs() {
      let erc20txns = await GetTxsByErcAccount(this.$rpc_http, "erc20", this.address, this.erc20CurrentPage - 1, this.erc20PageSize);
      this.erc20Total = erc20txns.total;
      this.erc20TransactionsList = erc20txns.resList;
      // console.log(erc20txns);
      let erc721txns = await GetTxsByErcAccount(this.$rpc_http, "erc721", this.address, this.erc721CurrentPage - 1, this.erc721PageSize);
      this.erc721Total = erc721txns.total;
      this.erc721TransactionsList = erc721txns.resList;
      // console.log(erc721txns);
      let erc1155txns = await GetTxsByErcAccount(this.$rpc_http, "erc1155", this.address, this.erc1155CurrentPage - 1, this.erc1155PageSize);
      this.erc1155Total = erc1155txns.total;
      this.erc1155TransactionsList = erc1155txns.resList;
      // console.log(erc1155txns);
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
