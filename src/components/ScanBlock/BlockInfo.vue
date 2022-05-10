<template lang="">
  <div class="container" style="margin-top: 2%; max-width: 1350px">
    <h3 style="display: inline">Block</h3>
    <p style="display: inline; margin-left: 1%">#{{ number }}</p>
    <el-tabs v-model="activeName" style="">
      <el-tab-pane label="Overview" name="first">
        <block-overview :data="blockOverviewData"></block-overview>
      </el-tab-pane>
      <el-tab-pane label="Comments" name="second">
        <block-comments :data="blockCommentsData"></block-comments>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "BlockInfo",
  props: ["number"],
  data() {
    return {
      activeName: "first",
      blockOverviewData: { blockNumber: this.number },
      blockCommentsData: { blockNumber: this.number },
    };
  },
  // methods: {
  //   handleClick(tab) {
  //     console.log(tab);
  //   },
  // },
};
</script>
<style lang=""></style>
