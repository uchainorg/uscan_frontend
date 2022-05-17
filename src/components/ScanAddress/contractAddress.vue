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
      <el-tabs v-model="activeName" style="">
        <el-tab-pane label="Transactions" name="transactions">
          <general-txs :txsData="generalTransactionsList"></general-txs>
        </el-tab-pane>
        <el-tab-pane label="Internal Txns" name="internalTxns">
          <internal-txs :txsData="internalTransactionsList"></internal-txs>
        </el-tab-pane>
        <el-tab-pane label="Erc20 Token Txns" name="erc20TokenTxns"> </el-tab-pane>
        <el-tab-pane label="Erc721 Token Txns" name="erc721TokenTxns"> </el-tab-pane>
        <el-tab-pane label="Contract" name="contract"> </el-tab-pane>
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
import internalTxs from "../Transaction/internalTxs.vue";
export default defineComponent({
  name: "ContractAddress",
  props: ["address"],
  components: { generalTxs, internalTxs },
  data() {
    return {
      activeName: "transactions",
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
      internalTransactionsList: [],
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
        this.internalTransactionsList.push(tx);
      });
      // console.log(this.tableDate);
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
