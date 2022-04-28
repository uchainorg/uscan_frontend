<template lang="">
  <div class="container" style="margin-top: 2%; max-width: 1350px">
    <h3 style="display: inline">Block</h3>
    <p style="display: inline; margin-left: 1%">#{{ number }}</p>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="">
      <el-tab-pane label="Overview" name="first">
        <component :is="componentName" :data="blockOverviewData"></component>
      </el-tab-pane>
      <el-tab-pane label="Comments" name="second">
        <component :is="componentName" :data="blockCommentsData"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BlockOverview from "./BlockOverview.vue";
import BlockComment from "./BlockComments.vue";
export default {
  name: "BlockInfo",
  props: ["number"],
  components: {
    BlockOverview,
    BlockComment,
  },
  data() {
    return {
      activeName: "first",
      componentName: "BlockOverview",
      blockOverviewData: { blockNumber: 1000 },
      blockCommentsData: { blockNumber: 2000 },
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.index == 1) {
        this.componentName = "BlockComment";
      } else {
        this.componentName = "BlockOverview";
      }
      console.log(this.componentName);
    },
  },
};
</script>
<style lang=""></style>
