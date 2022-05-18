<template lang="">
  <div>
    <h3 style="display: inline">Contract</h3>
    &nbsp;
    <p style="display: inline">{{ address }}</p>
    <el-row style="margin-top: 0.5%">
      <el-button type="info" size="small" round>info1</el-button>
      <el-button type="info" size="small" round>info1</el-button>
      <el-button type="info" size="small" round>info1</el-button>
    </el-row>
    <el-divider />
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
            <template v-slot:default="scope"> {{ scope.row.parameterValue }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin-top: 3%">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="Transactions" name="transactions">
          <!-- <general-txs :txsData="generalTransactionsList"></general-txs> -->
          <general-txs :txsData="generalTransactionsList" :headerData="generalTransactionsHeaderList"></general-txs>
        </el-tab-pane>
        <el-tab-pane label="Internal Txns" name="internalTxns">
          <general-txs :txsData="internalTransactionsList" :headerData="internalTransactionsHeaderList"></general-txs>
        </el-tab-pane>
        <el-tab-pane label="Erc20 Token Txns" name="erc20TokenTxns">
          <general-txs :txsData="erc20TransactionsList" :headerData="erc20TransactionsHeaderList"></general-txs>
        </el-tab-pane>
        <el-tab-pane label="Erc721 Token Txns" name="erc721TokenTxns">
          <general-txs :txsData="erc721TransactionsList" :headerData="erc721TransactionsHeaderList"></general-txs>
        </el-tab-pane>
        <el-tab-pane label="Contract" name="contract">
          <contract-info :contractAddress="address"></contract-info>
        </el-tab-pane>
        <el-tab-pane label="Events" name="events"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { getBlock } from "../../js/block.js";
import { diffTime } from "../../js/utils.js";
import generalTxs from "../Transaction/generalTxs.vue";
import contractInfo from "../Contract/contractInfo.vue";
export default defineComponent({
  name: "ContractAddress",
  props: ["address"],
  components: { generalTxs, contractInfo },
  data() {
    return {
      activeName: "contract",
      contractOverviewTableData: [
        {
          parameterName: "balance",
          parameterDisplay: "Balance:",
          parameterValue: "12.509180342280236748 Ether",
        },
        {
          parameterName: "value",
          parameterDisplay: "Value:",
          parameterValue: "$25,203.87 (@ $2,014.83/ETH)",
        },
        {
          parameterName: "token",
          parameterDisplay: "Token:",
          parameterValue: ">$10,429,996.22",
        },
      ],
      moreInfoTableData: [
        {
          parameterName: "balance",
          parameterDisplay: "Balance:",
          parameterValue: "12.509180342280236748 Ether",
        },
        {
          parameterName: "value",
          parameterDisplay: "Value:",
          parameterValue: "$25,203.87 (@ $2,014.83/ETH)",
        },
        {
          parameterName: "token",
          parameterDisplay: "Token:",
          parameterValue: ">$10,429,996.22",
        },
      ],
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
    };
  },
  created() {
    this.getGeneralTransactionsList();
  },
  methods: {
    async getGeneralTransactionsList() {
      let res = await getBlock(this.$rpc_http, 14790713);
      res.transactions.slice(0, 50).forEach((tx) => {
        (tx.method = "test-method"), (tx.age = diffTime(new Date(parseInt(res.timestamp)) * 1000, new Date())), (tx.ageFormat = new Date(parseInt(res.timestamp) * 1000).toUTCString());
        this.generalTransactionsList.push(tx);
      });
      // console.log(this.internalTransactionsList);
    },
    async getInternalTransactionsList() {
      let res = await getBlock(this.$rpc_http, 14790713);
      res.transactions.slice(0, 50).forEach((tx) => {
        (tx.method = "test-method"), (tx.age = diffTime(new Date(parseInt(res.timestamp)) * 1000, new Date())), (tx.ageFormat = new Date(parseInt(res.timestamp) * 1000).toUTCString());
        this.internalTransactionsList.push(tx);
      });
      // console.log(this.internalTransactionsList);
    },
    async getErc20TransactionsList() {
      let res = await getBlock(this.$rpc_http, 14790713);
      res.transactions.slice(0, 50).forEach((tx) => {
        (tx.method = "test-method"), (tx.age = diffTime(new Date(parseInt(res.timestamp)) * 1000, new Date())), (tx.ageFormat = new Date(parseInt(res.timestamp) * 1000).toUTCString());
        this.erc20TransactionsList.push(tx);
      });
      // console.log(this.internalTransactionsList);
    },
    async getErc721lTransactionsList() {
      let res = await getBlock(this.$rpc_http, 14790713);
      res.transactions.slice(0, 50).forEach((tx) => {
        (tx.method = "test-method"), (tx.age = diffTime(new Date(parseInt(res.timestamp)) * 1000, new Date())), (tx.ageFormat = new Date(parseInt(res.timestamp) * 1000).toUTCString());
        this.erc721TransactionsList.push(tx);
      });
      // console.log(this.internalTransactionsList);
    },
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
  },
});
</script>
<style lang="less" scoped>
.container-display {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
