<template lang="">
  <div>
    <!-- <el-row style="margin-top: 0.5%">
      <el-button type="info" plain>Code</el-button>
      <el-button type="info" plain>Read Contract</el-button>
      <el-button type="info" plain>Write Contract</el-button>
    </el-row> -->
    <br />
    <component :is="comName" :contractAddress="contractAddress"></component>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import codeContract from "./verifiedContract/codeContract.vue";
export default defineComponent({
  name: "verifiedContractInfo",
  props: ["contractAddress"],
  components: { codeContract },
  data() {
    return {
      comName: "unknown",
    };
  },
  created() {
    this.comName = "codeContract";
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
