<template lang="">
  <div>
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
          <div class="center-row" v-else-if="scope.row.parameterName == 'txHash'">
            {{ scope.row.parameterValue }} &nbsp;
            <copy-icon :text="scope.row.parameterValue"></copy-icon>
          </div>
          <div class="center-row" v-else-if="scope.row.parameterName == 'from'">
            <router-link :to="'/address/' + scope.row.parameterValue.from">{{ scope.row.parameterValue.from }}</router-link>
            &nbsp;
            <copy-icon :text="scope.row.parameterValue.from"></copy-icon>
          </div>
          <div v-else-if="scope.row.parameterName == 'to'">
            <div class="center-row" v-if="scope.row.parameterValue.to == ''">
              Contract &nbsp; <router-link :to="'/address/' + scope.row.parameterValue.contractAddress">{{ scope.row.parameterValue.contractAddress }}</router-link> Created &nbsp;
              <copy-icon :text="scope.row.parameterValue.contractAddress"></copy-icon>
            </div>
            <div class="center-row" v-else-if="scope.row.parameterValue.toName != ''">
              Contract &nbsp; <router-link :to="'/address/' + scope.row.parameterValue.to">{{ scope.row.parameterValue.to }} &nbsp; {{ scope.row.parameterValue.toName }}</router-link>
              &nbsp;
              <copy-icon :text="scope.row.parameterValue.to"></copy-icon>
            </div>
            <div class="center-row" v-else>
              <router-link :to="'/address/' + scope.row.parameterValue.to">{{ scope.row.parameterValue.to }}</router-link>
              &nbsp;
              <copy-icon :text="scope.row.parameterValue.to"></copy-icon>
            </div>
          </div>
          <div v-else-if="scope.row.parameterName == 'tokensTransferred'">
            <tokens-trans :tokensTransferData="scope.row.parameterValue"></tokens-trans>
          </div>
          <div v-else-if="scope.row.parameterName == 'gasFess'">Base: {{ scope.row.parameterValue.base }} | Max: {{ scope.row.parameterValue.max }} | Max Priority: {{ scope.row.parameterValue.maxPriority }}</div>
          <div :class="inputDataIsRolling ? 'rolling' : ''" v-else-if="scope.row.parameterName == 'input'">{{ scope.row.parameterValue }}</div>
          <div v-else-if="scope.row.parameterName == 'status'">
            <div v-if="scope.row.parameterValue == 1">
              <div class="success-status">
                <el-icon color="green"><SuccessFilled /></el-icon> &nbsp; Success
              </div>
            </div>
            <div v-if="scope.row.parameterValue == 0">
              <div class="fail-status">
                <el-icon color="red"><Failed /></el-icon> &nbsp; Fail
              </div>
            </div>
            <div v-if="scope.row.parameterValue == 3">
              <div class="pending-status">
                <el-icon><VideoPause /></el-icon> &nbsp; Pending
              </div>
            </div>
          </div>
          <div v-else>
            {{ scope.row.parameterValue }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetTxByHash } from "../../js/request.js";
import { formatTimestamp } from "../../js/utils.js";
import TokensTrans from "../Transaction/tokensTransferred.vue";
export default defineComponent({
  name: "TransactionOverview",
  props: ["txHashArg"],
  components: { TokensTrans },
  data() {
    return {
      tableData: [],
      inputDataIsRolling: false,
    };
  },
  created() {
    this.getTransactionRes(this.txHashArg);
  },
  watch: {
    async txHashArg(newVal) {
      this.tableData = [];
      this.getTransactionRes(newVal);
    },
  },
  methods: {
    async getTransactionRes(txHash) {
      // let res = await getTransaction(this.$rpc_http, txHash);
      let res = await GetTxByHash(this.$rpc_http, txHash);
      this.tableData.push(
        {
          parameterName: "txHash",
          parameterDisplay: "Transaction Hash:",
          parameterValue: this.txHashArg,
        },
        {
          parameterName: "status",
          parameterDisplay: "Status:",
          parameterValue: res.status,
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
            contractAddress: res.contractAddress,
            contractAddressName: res.contractAddressName,
            contractAddressSymbol: res.contractAddressSymbol,
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
            base: "(test)" + 0 + " Gwei",
            max: this.$wei2gwei(parseInt(res.maxFeePerGas)) + " Gwei",
            maxPriority: this.$wei2gwei(parseInt(res.maxPriorityFeePerGas)) + " Gwei",
          },
        },
        {
          parameterName: "input",
          parameterDisplay: "Input Data:",
          parameterValue: res.input,
        }
      );
      if (res.tokensTransferred.length > 0) {
        this.tableData.push({
          parameterName: "tokensTransferred",
          parameterDisplay: "Tokens Transferred:",
          parameterValue: res.tokensTransferred,
        });
      }
      if (res.input.length >= 761) {
        this.inputDataIsRolling = true;
      }
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
.rolling {
  height: 200px;
  overflow: auto;
}

.success-status {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(238, 249, 246);
  height: 33px;
  width: 90px;
  border-radius: 15px;
}

.pending-status {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(241, 242, 243);
  height: 33px;
  width: 90px;
  border-radius: 15px;
}

.fail-status {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(241, 242, 243);
  height: 33px;
  width: 90px;
  border-radius: 15px;
}
</style>
