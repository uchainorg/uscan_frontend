<template lang="">
  <el-table :data="tableData" style="width: 100%; border-radius: 15px" empty-text="loading..." :row-style="{ height: '50px' }">
    <el-table-column width="350px">
      <template v-slot:default="scope">
        <div class="center-row">
          <el-icon><QuestionFilled /></el-icon>&nbsp;{{ scope.row.parameterDisplay }}
        </div>
      </template>
    </el-table-column>
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
          <div v-if="scope.row.parameterValue.fromName != ''">
            Contract <router-link :to="'/address/' + scope.row.parameterValue.from">{{ scope.row.parameterValue.from }}</router-link> ({{ scope.row.parameterValue.fromName }})
          </div>
          <div v-else>
            <router-link :to="'/address/' + scope.row.parameterValue.from">{{ scope.row.parameterValue.from }}</router-link>
          </div>
        </div>
        <div v-else-if="scope.row.parameterName == 'to'">
          <div v-if="scope.row.parameterValue.toName != ''">
            Contract <router-link :to="'/address/' + scope.row.parameterValue.to">{{ scope.row.parameterValue.to }}</router-link> ({{ scope.row.parameterValue.toName }})
          </div>
          <div v-else>
            <router-link :to="'/address/' + scope.row.parameterValue.to">{{ scope.row.parameterValue.to }}</router-link>
          </div>
        </div>
        <div v-else-if="scope.row.parameterName == 'tokensTransferred'">
          <tokens-trans :tokensTransferData="scope.row.parameterValue"></tokens-trans>
        </div>
        <div v-else-if="scope.row.parameterName == 'gasFess'">Base: {{ scope.row.parameterValue.base }} | Max: {{ scope.row.parameterValue.max }} | Max Priority: {{ scope.row.parameterValue.maxPriority }}</div>
        <div v-else>
          {{ scope.row.parameterValue }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { defineComponent } from "vue";
import { GetTxByHash } from "../../js/request.js";
import { formatTimestamp } from "../../js/utils.js";
import TokensTrans from "../Transaction/tokensTransferred.vue";
export default defineComponent({
  name: "TransactionOverview",
  props: ["data"],
  components: { TokensTrans },
  data() {
    return {
      tableData: [],
      statusMap: new Map([
        [0, "Fail"],
        [1, "Success"],
        [3, "Pending"],
      ]),
    };
  },
  created() {
    this.getTransactionRes(this.data.txHash);
  },
  methods: {
    async getTransactionRes(txHash) {
      // let res = await getTransaction(this.$rpc_http, txHash);
      let res = await GetTxByHash(this.$rpc_http, txHash);
      this.tableData.push(
        {
          parameterName: "txHash",
          parameterDisplay: "Transaction Hash:",
          parameterValue: this.data.txHash,
        },
        {
          parameterName: "status",
          parameterDisplay: "Status:",
          parameterValue: this.statusMap.get(res.status),
        },
        {
          parameterName: "blockNumber",
          parameterDisplay: "Block:",
          parameterValue: parseInt(res.blockNumber),
        },
        {
          parameterName: "timestamp",
          parameterDisplay: "Timestamp:",
          parameterValue: formatTimestamp(res.createTime),
        },
        {
          parameterName: "from",
          parameterDisplay: "From:",
          parameterValue: {
            from: res.from,
            fromCode: res.fromCode,
            fromName: res.fromName,
            fromSymbol: res.fromSymbol,
          },
        },
        {
          parameterName: "to",
          parameterDisplay: "To:",
          parameterValue: {
            to: res.to,
            toCode: res.toCode,
            toName: res.toName,
            toSymbol: res.toSymbol,
          },
        },
        {
          parameterName: "value",
          parameterDisplay: "Value:",
          parameterValue: this.$wei2eth(res.value) + " Eth",
        },
        {
          parameterName: "transactionFee",
          parameterDisplay: "Transaction Fee:",
          parameterValue: this.$wei2eth(res.gas * res.gasPrice) + " Eth",
        },
        {
          parameterName: "gasPrice",
          parameterDisplay: "Gas Price:",
          parameterValue: this.$wei2eth(res.gasPrice),
        },
        {
          parameterName: "gas",
          parameterDisplay: "Gas:",
          parameterValue: parseInt(res.gas),
        },
        {
          parameterName: "gasFess",
          parameterDisplay: "Gas Fees:",
          parameterValue: {
            base: 0 + " Gwei",
            max: this.$wei2gwei(parseInt(res.maxFeePerGas)) + " Gwei",
            maxPriority: this.$wei2gwei(parseInt(res.maxPriorityFeePerGas)) + " Gwei",
          },
        },
        {
          parameterName: "gas",
          parameterDisplay: "Gas:",
          parameterValue: parseInt(res.gas),
        },
        {
          parameterName: "input",
          parameterDisplay: "Input Data:",
          parameterValue: res.input,
        }
      );
      if (res.tokensTransferred) {
        this.tableData.push({
          parameterName: "tokensTransferred",
          parameterDisplay: "Tokens Transferred:",
          parameterValue: res.tokensTransferred,
        });
      }
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
