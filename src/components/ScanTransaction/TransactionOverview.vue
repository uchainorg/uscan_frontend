<template lang="">
  <el-table :data="tableData" style="width: 100%; margin-top: -3%" empty-text="loading...">
    <el-table-column prop="parameterDisplay" width="350px"></el-table-column>
    <el-table-column prop="parameterValue">
      <template v-slot:default="scope">
        <!-- {{ scope.row.parameterValue }} -->
        <div v-if="scope.row.parameterName == 'blockNumber'" style="font-weight: 900">
          <router-link :to="'/block/' + scope.row.parameterValue">{{ scope.row.parameterValue }}</router-link>
        </div>
        <div class="center-row" v-else-if="scope.row.parameterName == 'timestamp'">
          <el-icon><clock /></el-icon>&nbsp;{{ scope.row.parameterValue }}
        </div>
        <div v-else-if="scope.row.parameterName == 'from'">
          <router-link :to="'/'">{{ scope.row.parameterValue }}</router-link>
        </div>
        <div v-else-if="scope.row.parameterName == 'to'">
          <router-link :to="'/'">{{ scope.row.parameterValue }}</router-link>
        </div>
        <div v-else>
          {{ scope.row.parameterValue }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { defineComponent } from "vue";
import { getTransaction } from "../../js/block.js";
export default defineComponent({
  name: "TransactionOverview",
  props: ["data"],
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getTransactionRes(this.data.txHash);
  },
  methods: {
    async getTransactionRes(txHash) {
      let res = await getTransaction(this.$rpc_http, txHash);
      console.log(res);
      this.tableData.push(
        {
          parameterName: "txHash",
          parameterDisplay: "Transaction Hash:",
          parameterValue: this.data.txHash,
        },
        {
          parameterName: "status",
          parameterDisplay: "Status:",
          parameterValue: "Success",
        },
        {
          parameterName: "blockNumber",
          parameterDisplay: "Block:",
          parameterValue: parseInt(res.blockNumber),
        },
        {
          parameterName: "timestamp",
          parameterDisplay: "Timestamp:",
          parameterValue: "(test)19 secs ago(Wed, 11 May 2022 05:14:27 GMT)",
        },
        {
          parameterName: "from",
          parameterDisplay: "From:",
          parameterValue: res.from,
        },
        {
          parameterName: "to",
          parameterDisplay: "To:",
          parameterValue: res.to,
        },
        {
          parameterName: "value",
          parameterDisplay: "Value:",
          parameterValue: parseInt(res.value),
        },
        {
          parameterName: "transactionFee",
          parameterDisplay: "Transaction Fee:",
          parameterValue: parseInt(res.gas),
        },
        {
          parameterName: "gasPrice",
          parameterDisplay: "Gas Price:",
          parameterValue: parseInt(res.gasPrice),
        },
        {
          parameterName: "gasLimit",
          parameterDisplay: "Gas Limit & Usage by Txn:",
          parameterValue: "(test)21,000 | 21,000 (100%)",
        },
        {
          parameterName: "gasFees",
          parameterDisplay: "Gas Fees:",
          parameterValue: "(test)Base: 45.990898678 Gwei |Max: 69.725511714 Gwei |Max Priority: 1 Gwei",
        },
        {
          parameterName: "input",
          parameterDisplay: "Input Data:",
          parameterValue: res.input,
        }
      );
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
