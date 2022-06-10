<template lang="">
  <div>
    <div class="center-row" style="font-size: 14px">
      <el-icon size="large"><InfoFilled /></el-icon> &nbsp; (test)Are you the contract creator?&nbsp;
      <router-link :to="'/verifyContract/' + contractAddress" style="font-size: 15px; font-weight: bold"> Verify and Publish </router-link>
      &nbsp;your contract source code today!
    </div>
    <br />
    <div style="font-size: 14px">
      (test)Note: We also found another&nbsp;
      <router-link :to="'/'" style="font-size: 15px; font-weight: bold"> 1 </router-link>
      &nbsp;contract with exact matching byte codes
    </div>

    <textarea class="byte-codes-text" rows="15" v-model="codeContent"> </textarea>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "contractInfo",
  props: ["contractAddress", "code"],
  data() {
    return {
      codeContent: "",
    };
  },
  updated() {
    this.codeContent = this.code;
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
