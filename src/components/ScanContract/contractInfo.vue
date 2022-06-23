<template lang="">
  <div>
    <div class="center-row" style="font-size: 14px">
      <el-icon size="large"><InfoFilled /></el-icon> &nbsp; Are you the contract creator?&nbsp;
      <router-link :to="'/verifyContract?a=' + contractAddress" style="font-size: 15px; font-weight: bold"> Verify and Publish </router-link>
      &nbsp;your contract source code today!
    </div>
    <br />

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
