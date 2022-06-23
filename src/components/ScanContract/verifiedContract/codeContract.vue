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
          <el-row style="margin: 10px">
            <el-col :span="10">Contract Name:</el-col>
            <el-col :span="14">{{ contractName }}</el-col>
          </el-row>
          <el-row style="margin: 10px">
            <el-col :span="10">Contract Version:</el-col>
            <el-col :span="14">{{ compilerVersion }}</el-col>
          </el-row>
          <el-row style="margin: 10px">
            <el-col :span="10">Optimization Enabled:</el-col>
            <el-col :span="14"> No with {{ optimizationRuns }} runs</el-col>
          </el-row>
          <el-row style="margin: 10px">
            <el-col :span="10">Other Settings:</el-col>
            <el-col :span="14">default evmVersion,{{ license }} license</el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div>
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
      <textarea class="byte-codes-text" style="margin: 0px" rows="10" v-model="this.contractABICode"> </textarea>
    </div>
    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Contract Creation Code</h4>
      </div>
      <textarea class="byte-codes-text" style="margin: 0px" rows="10" v-model="this.creationCode"> </textarea>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetContractContent, GetVerifyMetadata } from "../../../js/request.js";
import codeView from "../../Code/codeView.vue";
export default defineComponent({
  name: "codeContract",
  props: ["contractAddress"],
  components: { codeView },
  data() {
    return {
      address: this.contractAddress,
      contractName: "",
      compilerVersion: "",
      evmVersion: "default",
      license: "",
      licenseMap: new Map(),
      optimizationRuns: 0,
      contractSourceList: [],
      contractABICode: "",
      creationCode: "",
    };
  },
  created() {
    this.getLicenseTypesMap();
    this.getContractContent();
    // this.contractABICode = "aaaaaa";
  },
  watch: {
    contractAddress(newVal) {
      // console.log(newVal);
      this.address = newVal;
      this.getLicenseTypesMap();
      this.getContractContent();
    },
  },
  methods: {
    async getContractContent() {
      try {
        let data = await GetContractContent(this.$rpc_http, this.address);
        // console.log(data);
        this.contractName = data.contractName;
        this.compilerVersion = data.compilerVersion;
        this.license = this.licenseMap.get(data.licenseType);
        this.optimizationRuns = data.runs;
        this.contractABICode = data.abi;
        this.creationCode = data.object;
        // console.log(this.contractSourceCode);
        Object.keys(data.metadata).forEach((key) => {
          this.contractSourceList.push({
            filename: key,
            codeContent: data.metadata[key],
          });
        });
      } catch (err) {
        console.log(err.response);
      }
    },
    async getLicenseTypesMap() {
      let data = await GetVerifyMetadata(this.$rpc_http);
      data.licenseTypes.forEach((element) => {
        this.licenseMap.set(element.id, element.name);
      });
      // console.log(this.licenseMap);
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../../css/style.css";
</style>
