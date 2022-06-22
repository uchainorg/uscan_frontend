<template lang="">
  <div style="display: flex; flex-direction: column">
    <div style="text-align: center">
      <h3 style="font-size: 1.53125rem; font-weight: 400; color: #4a4f55">Verify & Publish Contract Source Code</h3>
      <p style="color: #8c98a4; ont-weight: 700; font-size: 80%; font-weight: bold">COMPILER TYPE AND VERSION SELECTION</p>
    </div>
    <el-divider />
    <div style="display: flex; justify-content: center">
      <p style="color: #77838f; width: 80%">
        &nbsp; &nbsp; Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, Etherscan will match the compiled code with that on the blockchain. Just like
        contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does
        what it is supposed to do.
      </p>
    </div>
    <br />
    <div style="display: flex; justify-content: center">
      <div style="display: flex; flex-direction: column">
        <div style="width: 700px; font-size: 0.875rem; margin-bottom: 10px">
          <p>Please enter the Contract Address you would like to verify</p>
          <el-input v-model="input" size="large" placeholder="0x..." clearable />
          <div style="color: red" v-if="this.inputRequired"><p>Required</p></div>
        </div>

        <div style="width: 700px; font-size: 0.875rem; margin-bottom: 10px">
          <p>Please select Compiler Type</p>
          <el-select v-model="compilerValue" placeholder="Select" size="large" style="width: 100%">
            <el-option v-for="item in compilerOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <div style="color: red" v-if="this.compilerValueRequired"><p>Required</p></div>
        </div>

        <div style="width: 700px; font-size: 0.875rem; margin-bottom: 10px">
          <p>Please select Compiler Version</p>
          <el-select v-model="compilerVersionValue" placeholder="Select" size="large" style="width: 100%" value-key="name">
            <el-option v-for="item in compilerVersionOptions" :key="item.value.name" :label="item.label" :value="item.value" />
          </el-select>
          <div style="color: red" v-if="this.compilerVersionValueRequired"><p>Required</p></div>
        </div>

        <div style="width: 700px; font-size: 0.875rem; margin-bottom: 10px">
          <p>Please select Open Source License Type</p>
          <el-select v-model="licenseValue" placeholder="Select" size="large" style="width: 100%">
            <el-option v-for="item in licenseOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <div style="color: red" v-if="this.licenseValueRequired"><p>Required</p></div>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 10px">
      <el-button type="primary" size="large" @click="moveToSubmit">Continue</el-button>
      <el-button type="info" size="large" @click="reset">Reset</el-button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetVerifyMetadata } from "../../js/request.js";
export default defineComponent({
  name: "verifyContract",
  props: ["contractAddress"],
  data() {
    return {
      input: "",
      inputRequired: false,
      compilerValue: "",
      compilerValueRequired: false,
      compilerVersionValue: "",
      compilerVersionValueRequired: false,
      licenseValue: "",
      licenseValueRequired: false,
      compilerOptions: [
        {
          value: "solidity-single-file",
          label: "Solidity (Single file)",
        },
        {
          value: "solidity-standard-json-input",
          label: "Solidity (Standard-Json-Input)",
        },
      ],
      compilerVersionOptions: [],
      licenseOptions: [],
    };
  },
  created() {
    if (this.$route.query.a) {
      this.input = this.$route.query.a;
    }
    this.getMeatData();
  },
  beforeCreate() {
    document.title = "Verify & Publish Contract Source Code | The Coq Explorer";
  },
  watch: {
    $route(to) {
      // console.log(to);
      if (to.query.a) {
        this.input = this.$route.query.a;
      }
      (this.compilerValue = ""), (this.compilerVersionValue = ""), (this.licenseValue = "");
      this.inputRequired = false;
      this.compilerValueRequired = false;
      this.compilerVersionValueRequired = false;
      this.licenseValueRequired = false;
    },
  },
  methods: {
    moveToSubmit() {
      this.input == "" ? (this.inputRequired = true) : (this.inputRequired = false);
      this.compilerValue == "" ? (this.compilerValueRequired = true) : (this.compilerValueRequired = false);
      this.compilerVersionValue == "" ? (this.compilerVersionValueRequired = true) : (this.compilerVersionValueRequired = false);
      this.licenseValue == "" ? (this.licenseValueRequired = true) : (this.licenseValueRequired = false);
      if (this.input != "" && this.compilerValue != "" && this.compilerVersionValue != "" && this.licenseValue != "") {
        let url = "/verifyContract/submit?a=" + this.input + "&ct=" + this.compilerValue + "&cv=" + this.compilerVersionValue.name + "&cf=" + this.compilerVersionValue.fileName + "&lictype=" + this.licenseValue;
        // console.log(url);
        this.$router.push(url);
      }
    },
    reset() {
      if (this.$route.query.a) {
        this.$router.push("/verifyContract");
      } else {
        (this.input = ""), (this.compilerValue = ""), (this.compilerVersionValue = ""), (this.licenseValue = "");
        this.inputRequired = false;
        this.compilerValueRequired = false;
        this.compilerVersionValueRequired = false;
        this.licenseValueRequired = false;
      }
    },
    async getMeatData() {
      let data = await GetVerifyMetadata(this.$rpc_http);
      // console.log(data);
      data.compilerVersions.forEach((element) => {
        this.compilerVersionOptions.push({
          value: { name: element.name, fileName: element.fileName },
          label: element.name,
        });
      });
      data.licenseTypes.forEach((element) => {
        this.licenseOptions.push({
          value: element.id,
          label: element.name,
        });
      });
    },
  },
});
</script>
<style lang="less" scoped></style>
