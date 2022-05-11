<template lang="">
  <el-table :data="tableData" style="width: 100%; margin-top: -3%" empty-text="loading...">
    <el-table-column prop="parameterDisplay" width="350px"></el-table-column>
    <el-table-column prop="parameterValue">
      <template v-slot:default="scope">
        <div v-if="scope.row.parameterName == 'blockHeight'" style="font-weight: 900">
          {{ scope.row.parameterValue }}
        </div>
        <div class="center-row" v-else-if="scope.row.parameterName == 'timestamp'">
          <el-icon><clock /></el-icon>&nbsp;{{ scope.row.parameterValue }}
        </div>
        <div v-else-if="scope.row.parameterName == 'transactions'">
          <el-tooltip class="box-item" effect="dark" content="Click to view Transactions" placement="top-start">
            <el-button type="primary" plain size="small" @click="moveToTxs">{{ scope.row.parameterValue }} transactions</el-button>
          </el-tooltip>
          &nbsp;in this block
        </div>
        <div v-else-if="scope.row.parameterName == 'minedBy'">
          <router-link :to="'/'">{{ scope.row.parameterValue }}</router-link>
        </div>
        <div v-else-if="scope.row.parameterName == 'difficulty'">
          {{ scope.row.parameterValue }}
        </div>
        <div v-else-if="scope.row.parameterName == 'totalDifficulty'">
          {{ scope.row.parameterValue }}
        </div>
        <div v-else-if="scope.row.parameterName == 'size'">{{ scope.row.parameterValue }}&nbsp;bytes</div>
        <div v-else-if="scope.row.parameterName == 'gasUsed'">{{ scope.row.parameterValue }}</div>
        <div v-else-if="scope.row.parameterName == 'baseFeePerGas'">{{ scope.row.parameterValue }} wei</div>

        <div v-else>
          {{ scope.row.parameterValue }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getBlock } from "../../js/block.js";
import { diffTime } from "../../js/utils.js";
import { Clock } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "BlockOverview",
  props: ["data"],
  components: [Clock],
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getBlockRes(this.data.blockNumber);
  },
  methods: {
    formatTimestamp(timestamp) {
      let createTime = new Date(parseInt(timestamp)) * 1000;
      let date = new Date(parseInt(timestamp) * 1000).toUTCString();
      return diffTime(createTime, new Date()) + "(" + date + ")";
    },
    moveToTxs() {
      this.$router.push("/block/txs/" + this.data.blockNumber);
    },
    async getBlockRes(blockNumber) {
      let res = await getBlock(this.$rpc_http, blockNumber);
      // console.log("getBlockRes", res);
      this.tableData.push(
        {
          parameterName: "blockHeight",
          parameterDisplay: "Block Height:",
          parameterValue: blockNumber,
        },
        {
          parameterName: "timestamp",
          parameterDisplay: "Timestamp:",
          parameterValue: this.formatTimestamp(res.timestamp),
        },
        {
          parameterName: "transactions",
          parameterDisplay: "Transactions:",
          parameterValue: res.transactions.length,
        },
        {
          parameterName: "minedBy",
          parameterDisplay: "Mined by:",
          parameterValue: res.miner,
        },
        {
          parameterName: "blockReward",
          parameterDisplay: "Block Reward:",
          parameterValue: "(test)2.058262409143852486 Ether (2 + 1.325123428079492042 - 1.266861018935639556)",
        },
        {
          parameterName: "unclesReward",
          parameterDisplay: "Uncles Reward:",
          parameterValue: "(test)0",
        },
        {
          parameterName: "difficulty",
          parameterDisplay: "Difficulty:",
          parameterValue: BigInt(parseInt(res.difficulty))
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"),
        },
        {
          parameterName: "totalDifficulty",
          parameterDisplay: "Total Difficulty:",
          parameterValue: BigInt(parseInt(res.totalDifficulty))
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"),
        },
        {
          parameterName: "size",
          parameterDisplay: "Size:",
          parameterValue: parseInt(res.size)
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"),
        },
        {
          parameterName: "gasUsed",
          parameterDisplay: "Gas Used:",
          parameterValue: parseInt(res.gasUsed)
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"),
        },
        {
          parameterName: "gasLimit",
          parameterDisplay: "Gas Limit:",
          parameterValue: parseInt(res.gasLimit)
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"),
        },
        {
          parameterName: "baseFeePerGas",
          parameterDisplay: "Base Fee Per Gas:",
          parameterValue: parseInt(res.baseFeePerGas),
        },
        {
          parameterName: "burntFees",
          parameterDisplay: "Burnt Fees:",
          parameterValue: "(test)1.266861018935639556 Ether",
        },
        {
          parameterName: "extraData",
          parameterDisplay: "Extra Data:",
          parameterValue: res.extraData,
        },
        {
          parameterName: "hash",
          parameterDisplay: "Hash:",
          parameterValue: res.hash,
        },
        {
          parameterName: "parentHash",
          parameterDisplay: "Parent Hash:",
          parameterValue: res.parentHash,
        },
        {
          parameterName: "sha3Uncles",
          parameterDisplay: "Sha3Uncles:",
          parameterValue: res.sha3Uncles,
        },
        {
          parameterName: "stateRoot",
          parameterDisplay: "StateRoot:",
          parameterValue: res.stateRoot,
        },
        {
          parameterName: "nonce",
          parameterDisplay: "Nonce:",
          parameterValue: res.nonce,
        }
      );
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
