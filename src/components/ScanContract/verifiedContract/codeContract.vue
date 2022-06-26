<template lang="">
  <div>
    <div class="center-row">
      <el-icon :color="'green'"><CircleCheckFilled /></el-icon> &nbsp;
      <h4>Contract Source Code Verified</h4>
    </div>
    <div style="display: flex; flex-direction: row; margin-top: 20px; margin-bottom: 30px">
      <div style="width: 50%">
        <el-row>
          <el-col :span="8">Contract Name:</el-col>
          <el-col :span="16" class="bolder">{{ contractName }}</el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">Contract Version:</el-col>
          <el-col :span="16" class="bolder">{{ compilerVersion }}</el-col>
        </el-row>
      </div>
      <div style="width: 50%; margin-left: 3%">
        <el-row>
          <el-col :span="8">Optimization Enabled:</el-col>
          <el-col :span="16" class="bolder">{{ this.optimizationRuns == 0 ? "No" : "Yes" }} with {{ optimizationRuns }} runs</el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">Other Settings:</el-col>
          <el-col :span="16" class="bolder">default evmVersion, {{ license }}</el-col>
        </el-row>
      </div>
    </div>

    <div style="margin-top: 20px">
      <div v-for="(code, index) in this.contractSourceList" :key="index">
        <div class="center-row">
          <el-icon><Document /></el-icon> &nbsp;
          <h4>Contract Source Code (Solidity)</h4>
        </div>
        <p style="font-size: 13px">File {{ index + 1 }} of {{ this.contractSourceList.length }} : {{ code.filename }}</p>
        <code-view :codeData="code.codeContent"></code-view>
      </div>
    </div>
    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Contract ABI</h4>
      </div>
      <textarea class="byte-codes-text" style="margin: 0px" rows="10" v-model="this.contractABICodeContent"> </textarea>
    </div>
    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Contract Creation Code</h4>
      </div>
      <textarea class="byte-codes-text" style="margin: 0px" rows="10" v-model="this.creationCodeContent"> </textarea>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import codeView from "../../Code/codeView.vue";
export default defineComponent({
  name: "codeContract",
  // props: ["contractAddress"],
  components: { codeView },
  props: {
    contractAddress: {
      type: String,
      require: true,
    },
    contractName: {
      type: String,
      require: true,
    },
    compilerVersion: {
      type: String,
      require: true,
    },
    evmVersion: {
      type: String,
      require: true,
    },
    license: {
      type: String,
      require: true,
    },
    optimizationRuns: {
      type: Number,
    },
    contractSourceList: {
      type: Array,
      require: true,
    },
    contractABICode: {
      type: String,
      require: true,
    },
    creationCode: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      contractABICodeContent: "",
      creationCodeContent: "",
    };
  },
  updated() {
    this.contractABICodeContent = this.contractABICode;
    this.creationCodeContent = this.creationCode;
  },
});
</script>
<style lang="less" scoped>
@import "../../../css/style.css";
.bolder {
  font-size: 15px;
  font-weight: bold;
  color: #4a4f55;
}
</style>
