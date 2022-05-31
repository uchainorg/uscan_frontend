<template lang="">
  <div class="container">
    <h3 style="display: inline">Block</h3>
    <p style="display: inline; margin-left: 1%">#{{ this.blockNumber }}</p>
    <el-tabs v-model="activeName" style="">
      <el-tab-pane label="Overview" name="first">
        <block-overview v-model:blockNumber="this.blockNumber"></block-overview>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "BlockInfo",
  props: ["number"],
  data() {
    return {
      activeName: "first",
      blockNumber: this.number,
    };
  },
  beforeCreate() {
    document.title = "Blocks #" + this.number + " | The Coq Explorer";
  },
  // methods: {
  //   handleClick(tab) {
  //     console.log(tab);
  //   },
  // },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
