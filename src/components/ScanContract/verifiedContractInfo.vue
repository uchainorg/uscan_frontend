<template lang="">
  <div>
    <el-row style="margin-top: 0.5%">
      <el-button type="info" plain @click="moveToCode" ref="code">Code</el-button>
      <el-button type="info" plain @click="moveToRead">Read Contract</el-button>
      <el-button type="info" plain>Write Contract</el-button>
    </el-row>
    <br />
    <component
      :is="comName"
      :contractAddress="contractAddress"
      :contractName="contractName"
      :compilerVersion="compilerVersion"
      :optimizationRuns="optimizationRuns"
      :evmVersion="evmVersion"
      :license="license"
      :contractSourceList="contractSourceList"
      :contractABICode="contractABICode"
      :creationCode="creationCode"
    ></component>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import codeContract from "./verifiedContract/codeContract.vue";
import readContract from "./verifiedContract/readContract.vue";
import { GetContractContent, GetVerifyMetadata } from "../../js/request.js";

export default defineComponent({
  name: "verifiedContractInfo",
  props: ["contractAddress"],
  components: { codeContract, readContract },
  data() {
    return {
      comName: "unknown",

      address: this.contractAddress,
      contractName: "123",
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
    // this.moveToCode();
  },
  mounted() {
    this.$refs.code.$el.click();
  },
  watch: {
    contractAddress(newVal) {
      // console.log(newVal);
      this.address = newVal;
      // this.getLicenseTypesMap();
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
    moveToRead() {
      this.comName = "readContract";
    },
    moveToCode() {
      this.comName = "codeContract";
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
