<template lang="">
  <!-- <div>{{ this.txHash }} base</div> -->
  <div>
    <h4>Status:</h4>
    <div v-if="baseInfo.status == 1" class="center-row">
      <el-icon color="green"><SuccessFilled /></el-icon> &nbsp; Success
    </div>
    <div v-if="baseInfo.status == 0" class="center-row">
      <el-icon color="red"><Failed /></el-icon> &nbsp; Fail
    </div>
    <div v-if="baseInfo.status == 3" class="center-row">
      <el-icon><VideoPause /></el-icon> &nbsp; Pending
    </div>
    <el-divider />
    <h4>Transaction Fee:</h4>
    {{ this.$wei2eth(baseInfo.gasLimit * baseInfo.gasUsed) }} Eth
    <el-divider />
    <h4>Gas Info:</h4>
    {{ baseInfo.gasUsed }} Used From {{ baseInfo.gasLimit }} GasLimit
    <el-divider />
    <h4>Nonce:</h4>
    {{ baseInfo.nonce }}
    <el-divider />

    <router-link class="center-row" :to="'/tx/' + txHash">
      See more details &nbsp; <el-icon size="large"><Link /></el-icon>
    </router-link>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetBaseTxByTxHash } from "../../js/request.js";
export default defineComponent({
  name: "BaseTxInfo",
  props: ["txHash"],
  data() {
    return {
      baseInfo: {},
    };
  },
  created() {
    this.getBaseTxByTxHash();
  },
  methods: {
    async getBaseTxByTxHash() {
      if (this.txHash != "") {
        let res = await GetBaseTxByTxHash(this.$rpc_http, this.txHash);
        console.log(res);
        this.baseInfo = res;
      }
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
