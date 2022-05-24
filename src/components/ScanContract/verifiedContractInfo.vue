<template lang="">
  <div>
    <el-row style="margin-top: 0.5%">
      <el-button type="info" plain>Code</el-button>
      <el-button type="info" plain>Read Contract</el-button>
      <el-button type="info" plain>Write Contract</el-button>
    </el-row>
    <br />
    <div class="center-row">
      <el-icon :color="'green'"><CircleCheckFilled /></el-icon> &nbsp;
      <h4>Contract Source Code Verified</h4>
    </div>
    <div style="width: 50%">
      <el-table :data="contractInfoData" style="margin-top: -3%; width: 95%" empty-text="loading...">
        <el-table-column prop="parameterDisplay"></el-table-column>
        <el-table-column prop="parameterValue">
          <template v-slot:default="scope"> {{ scope.row.parameterValue }}</template>
        </el-table-column>
      </el-table>
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
import codeView from "../Code/codeView.vue";
export default defineComponent({
  name: "verifiedContractInfo",
  props: ["contractAddress"],
  components: { codeView },
  data() {
    return {
      contractInfoData: [
        {
          parameterName: "contractName",
          parameterDisplay: "Contract Name:",
          parameterValue: "UniswapV2Pair",
        },
        {
          parameterName: "optimizationEnabled",
          parameterDisplay: "Optimization Enabled:",
          parameterValue: "Yes with 999999 runs",
        },
        {
          parameterName: "compilerVersion",
          parameterDisplay: "Compiler Version",
          parameterValue: "v0.5.16+commit.9c3226ce",
        },
        {
          parameterName: "otherSettings",
          parameterDisplay: "Other Settings:",
          parameterValue: "default evmVersion, GNU GPLv3 license",
        },
      ],
    };
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
