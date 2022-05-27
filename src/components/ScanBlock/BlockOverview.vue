<template lang="">
  <el-table :data="tableData" style="width: 100%; margin-top: -37px; border-radius: 15px" empty-text="loading..." :row-style="{ height: '50px' }">
    <el-table-column width="350px">
      <template v-slot:default="scope">
        <div class="center-row">
          <el-icon><QuestionFilled /></el-icon>&nbsp;{{ scope.row.parameterDisplay }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="parameterValue">
      <template v-slot:default="scope">
        <div v-if="scope.row.parameterName == 'blockHeight'" style="font-weight: 900">
          {{ scope.row.parameterValue }}
          &nbsp;
          <el-button-group>
            <el-button type="primary" size="small" plain @click="moveToBlock(parseInt(this.blockNumber) - 1)">
              <el-icon><ArrowLeftBold /></el-icon>
            </el-button>
            <el-button type="primary" size="small" plain @click="moveToBlock(parseInt(this.blockNumber) + 1)">
              <el-icon><ArrowRightBold /></el-icon>
            </el-button>
          </el-button-group>
        </div>
        <div class="center-row" v-else-if="scope.row.parameterName == 'timestamp'">
          <el-icon><clock /></el-icon>&nbsp;{{ scope.row.parameterValue }}
        </div>
        <div v-else-if="scope.row.parameterName == 'transactions'">
          <el-tooltip class="box-item" effect="dark" content="Click to view Transactions" placement="top-start">
            <el-button type="primary" plain size="small" @click="moveToTxs" style="border: 0">{{ scope.row.parameterValue }} transactions</el-button>
          </el-tooltip>
          &nbsp;in this block
        </div>
        <div v-else-if="scope.row.parameterName == 'minedBy'">
          <router-link :to="'/address/' + scope.row.parameterValue">{{ scope.row.parameterValue }}</router-link>
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
import { formatTimestamp } from "../../js/utils.js";
import { Clock } from "@element-plus/icons-vue";
import { GetBlockByNumber } from "../../js/request.js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "BlockOverview",
  props: ["blockNumber"],
  emits: ["update:blockNumber"],
  components: [Clock],
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getBlockRes(this.blockNumber);
  },
  beforeRouteUpdate(to, from) {
    console.log(to);
    console.log(from);
  },
  methods: {
    // formatTimestamp(timestamp) {
    //   let createTime = new Date(parseInt(timestamp)) * 1000;
    //   let date = new Date(parseInt(timestamp) * 1000).toUTCString();
    //   return diffTime(createTime, new Date()) + "(" + date + ")";
    // },
    moveToTxs() {
      this.$router.push("/block/txs/" + this.blockNumber);
    },
    moveToBlock(blkNum) {
      this.$emit("update:blockNumber", blkNum);
      this.tableData = [];
      this.getBlockRes(blkNum);
    },
    async getBlockRes(blockNumber) {
      // let res = await getBlock(this.$rpc_http, blockNumber);
      // console.log("getBlockRes", res);
      let res = await GetBlockByNumber(this.$rpc_http, blockNumber);
      this.tableData.push(
        {
          parameterName: "blockHeight",
          parameterDisplay: "Block Height:",
          parameterValue: blockNumber,
        },
        {
          parameterName: "timestamp",
          parameterDisplay: "Timestamp:",
          parameterValue: formatTimestamp(res.timestamp),
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
