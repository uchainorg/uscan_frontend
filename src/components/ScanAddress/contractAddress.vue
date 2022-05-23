<template lang="">
  <div>
    <h3 style="display: inline">Contract</h3>
    &nbsp;
    <p style="display: inline">{{ address }}</p>
    <!-- <p style="display: inline">{{ info }}</p> -->
    <!-- <el-row style="margin-top: 0.5%">
      <el-button type="info" size="small" round>info1</el-button>
      <el-button type="info" size="small" round>info1</el-button>
      <el-button type="info" size="small" round>info1</el-button>
    </el-row> -->
    <!-- <el-divider /> -->
    <div class="container-display">
      <div style="width: 50%">
        <h4>Contract Overview</h4>
        <el-table :data="contractOverviewTableData" style="margin-top: -3%; width: 95%" empty-text="loading...">
          <el-table-column prop="parameterDisplay"></el-table-column>
          <el-table-column prop="parameterValue">
            <template v-slot:default="scope"> {{ scope.row.parameterValue }}</template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 50%">
        <h4>More Info</h4>
        <el-table :data="moreInfoTableData" style="margin-top: -3%; width: 95%" empty-text="loading...">
          <el-table-column prop="parameterDisplay"></el-table-column>
          <el-table-column prop="parameterValue">
            <template v-slot:default="scope">
              <div v-if="scope.row.parameterName == 'creator'" style="font-weight: 900">
                <router-link :to="'/address/' + scope.row.parameterValue.creator">{{ scope.row.parameterValue.creator.slice(0, 11) + "..." }}</router-link>
                at txn
                <router-link :to="'/tx/' + scope.row.parameterValue.tx">{{ scope.row.parameterValue.tx.slice(0, 11) + "..." }}</router-link>
              </div>
              <div v-else>
                {{ scope.row.parameterValue }}
              </div>
            </template>
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
              :currentPage="currentPage"
              :page-size="pageSize"
              :page-sizes="[10, 25, 50, 100]"
              :pager-count="5"
              :small="small"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="GeneralHandleSizeChange"
              @current-change="GeneralHandleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="Internal Txns" name="internalTxns">
          <general-txs :txsData="internalTransactionsList" :headerData="internalTransactionsHeaderList"></general-txs>
        </el-tab-pane>
        <el-tab-pane label="Erc20 Token Txns" name="erc20TokenTxns">
          <general-txs :txsData="erc20TransactionsList" :headerData="erc20TransactionsHeaderList"></general-txs>
        </el-tab-pane>
        <el-tab-pane label="Erc721 Token Txns" name="erc721TokenTxns">
          <general-txs :txsData="erc721TransactionsList" :headerData="erc721TransactionsHeaderList"></general-txs>
        </el-tab-pane> -->
        <el-tab-pane label="Contract" name="contract">
          <contract-info :contractAddress="address" :code="info.code"></contract-info>
        </el-tab-pane>
        <!-- <el-tab-pane label="Events" name="events"> </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetTxsByContract } from "../../js/request.js";
import generalTxs from "../Transaction/generalTxs.vue";
import contractInfo from "../ScanContract/contractInfo.vue";
export default defineComponent({
  name: "contractAddress",
  props: ["address", "info"],
  components: { generalTxs, contractInfo },
  data() {
    return {
      activeName: "transactions",
      contractOverviewTableData: [],
      moreInfoTableData: [],
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
          key: "hash",
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
      internalTransactionsList: [],
      internalTransactionsHeaderList: [
        {
          label: "Parent Txn Hash",
          key: "hash",
        },
        {
          label: "block",
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
      ],
      erc20TransactionsList: [],
      erc20TransactionsHeaderList: [
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
          key: "from",
        },
      ],
      erc721TransactionsList: [],
      erc721TransactionsHeaderList: [
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
          label: "Token ID",
          key: "blockNumber",
        },
        {
          label: "Token",
          key: "from",
        },
        {
          label: "Details",
          key: "to",
        },
      ],
      currentPage: 1,
      pageSize: 25,
      small: true,
      total: 0,
    };
  },
  created() {
    this.getGeneralTransactionsList();
  },
  updated() {
    if (this.contractOverviewTableData.length == 0) {
      this.contractOverviewTableData.push({
        parameterName: "balance",
        parameterDisplay: "Balance:",
        parameterValue: this.$wei2eth(this.info.balance) + " Eth",
      });
    }

    if (this.moreInfoTableData.length == 0) {
      this.moreInfoTableData.push({
        parameterName: "creator",
        parameterDisplay: "Creator:",
        parameterValue: { creator: this.info.creator, tx: this.info.creator },
      });
    }
  },
  methods: {
    async getGeneralTransactionsList() {
      let res = await GetTxsByContract(this.$rpc_http, this.address, this.currentPage - 1, this.pageSize);
      // console.log("getGeneralTransactionsList", res);
      this.generalTransactionsList = res.resList;
      this.total = res.total;
    },
    // async getInternalTransactionsList() {
    //   let res = await getBlock(this.$rpc_http, 14790713);
    //   res.transactions.slice(0, 50).forEach((tx) => {
    //     (tx.method = "test-method"), (tx.age = diffTime(new Date(parseInt(res.timestamp)) * 1000, new Date())), (tx.ageFormat = new Date(parseInt(res.timestamp) * 1000).toUTCString());
    //     this.internalTransactionsList.push(tx);
    //   });
    //   // console.log(this.internalTransactionsList);
    // },
    // async getErc20TransactionsList() {
    //   let res = await getBlock(this.$rpc_http, 14790713);
    //   res.transactions.slice(0, 50).forEach((tx) => {
    //     (tx.method = "test-method"), (tx.age = diffTime(new Date(parseInt(res.timestamp)) * 1000, new Date())), (tx.ageFormat = new Date(parseInt(res.timestamp) * 1000).toUTCString());
    //     this.erc20TransactionsList.push(tx);
    //   });
    //   // console.log(this.internalTransactionsList);
    // },
    // async getErc721lTransactionsList() {
    //   let res = await getBlock(this.$rpc_http, 14790713);
    //   res.transactions.slice(0, 50).forEach((tx) => {
    //     (tx.method = "test-method"), (tx.age = diffTime(new Date(parseInt(res.timestamp)) * 1000, new Date())), (tx.ageFormat = new Date(parseInt(res.timestamp) * 1000).toUTCString());
    //     this.erc721TransactionsList.push(tx);
    //   });
    //   // console.log(this.internalTransactionsList);
    // },
    handleTabClick(tab) {
      // console.log(tab.props);
      if (tab.props.name == "internalTxns") {
        this.getInternalTransactionsList();
      } else if (tab.props.name == "erc20TokenTxns") {
        this.getErc20TransactionsList();
      } else if (tab.props.name == "erc721TokenTxns") {
        this.getErc721lTransactionsList();
      }
    },
    async GeneralHandleCurrentChange(val) {
      this.tableDate = [];
      this.currentPage = val;
      let res = await GetTxsByContract(this.$rpc_http, this.address, this.currentPage - 1, this.pageSize);
      this.generalTransactionsList = res.resList;
      this.total = res.total;
    },
    async GeneralHandleSizeChange(val) {
      this.tableDate = [];
      this.currentPage = 1;
      this.pageSize = val;
      let res = await GetTxsByContract(this.$rpc_http, this.address, this.currentPage - 1, this.pageSize);
      this.generalTransactionsList = res.resList;
      this.total = res.total;
    },
  },
});
</script>
<style lang="less" scoped>
.container-display {
  display: flex;
  justify-content: center;
  width: 100%;
}
@import "../../css/style.css";
</style>
