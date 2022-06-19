<template lang="">
  <div>
    <div class="center-row">
      <el-icon :color="'green'"><CircleCheckFilled /></el-icon> &nbsp;
      <h4>Contract Source Code Verified</h4>
    </div>
    <div style="width: 50%">
      <el-card class="box-card-address">
        <template #header>
          <div class="card-header">
            <span>Contract Overview</span>
          </div>
        </template>
        <div class="card-content">
          <el-row>
            <el-col :span="10">Contract Name:</el-col>
            <el-col :span="14">123</el-col>
          </el-row>
          <el-row>
            <el-col :span="10">Contract Version:</el-col>
            <el-col :span="14">1234</el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Contract Source Code (Solidity)</h4>
      </div>
      <code-view :codeData="'select a from table1 where b = 1'"></code-view>
    </div>
    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Contract Security Audit</h4>
      </div>
      <code-view :codeData="'select a from table1 where b = 1'"></code-view>
    </div>
    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Contract ABI</h4>
      </div>
      <code-view :codeData="'select a from table1 where b = 1'"></code-view>
    </div>
    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Contract Creation Code</h4>
      </div>
      <code-view :codeData="'select a from table1 where b = 1'"></code-view>
    </div>
    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Deployed ByteCode Sourcemap</h4>
      </div>
      <code-view :codeData="'select a from table1 where b = 1'"></code-view>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import codeView from "../../Code/codeView.vue";
export default defineComponent({
  name: "codeContract",
  props: ["contractAddress"],
  components: { codeView },
});
</script>
<style lang="less" scoped>
@import "../../../css/style.css";
</style>
