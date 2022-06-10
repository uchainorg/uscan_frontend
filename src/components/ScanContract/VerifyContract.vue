<template lang="">
  <div style="display: flex; flex-direction: column">
    <div style="text-align: center">
      <h3 style="font-size: 1.53125rem; font-weight: 400; color: #4a4f55">Verify & Publish Contract Source Code</h3>
      <p style="color: #8c98a4; ont-weight: 700; font-size: 80%; font-weight: bold">COMPILER TYPE AND VERSION SELECTION</p>
    </div>
    <el-divider />
    <div style="display: flex; justify-content: center">
      <p style="color: #77838f; width: 80%">
        Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, Etherscan will match the compiled code with that on the blockchain. Just like contracts, a
        "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is
        supposed to do.
      </p>
    </div>
    <br />
    <div style="display: flex; justify-content: center">
      <div style="display: flex; flex-direction: column">
        <div style="width: 700px; font-size: 0.875rem; margin-bottom: 10px">
          <p>Please enter the Contract Address you would like to verify</p>
          <el-input v-model="input" size="large" clearable />
        </div>

        <div style="width: 700px; font-size: 0.875rem; margin-bottom: 10px">
          <p>Please select Compiler Type</p>
          <el-select v-model="compilerValue" placeholder="Select" size="large" style="width: 100%">
            <el-option v-for="item in compilerOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>

        <div style="width: 700px; font-size: 0.875rem; margin-bottom: 10px">
          <p>Please select Compiler Version</p>
          <el-select v-model="compilerValue" placeholder="Select" size="large" style="width: 100%">
            <el-option v-for="item in compilerOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>

        <div style="width: 700px; font-size: 0.875rem; margin-bottom: 10px">
          <p>Please select Open Source License Type</p>
          <el-select v-model="licenseValue" placeholder="Select" size="large" style="width: 100%">
            <el-option v-for="item in licenseOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 10px"><el-button type="primary" size="large" @click="moveToSubmit">Continue</el-button></div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "verifyContract",
  props: ["contractAddress"],
  data() {
    return {
      input: "",
      compilerValue: "",
      licenseValue: "",
      compilerOptions: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      licenseOptions: [
        {
          value: "Option6",
          label: "Option6",
        },
        {
          value: "Option7",
          label: "Option7",
        },
        {
          value: "Option8",
          label: "Option8",
        },
        {
          value: "Option9",
          label: "Option9",
        },
        {
          value: "Option10",
          label: "Option10",
        },
      ],
    };
  },
  created() {
    this.input = this.contractAddress;
  },
  methods: {
    moveToSubmit() {
      this.$router.push("/verifyContract/submit?a=0xe70ddeb61a86a7ed4a4fe9793c47cc2a16b8467a&c=v0.8.14%2bcommit.80d49f37&lictype=1");
    },
  },
});
</script>
<style lang="less" scoped></style>
