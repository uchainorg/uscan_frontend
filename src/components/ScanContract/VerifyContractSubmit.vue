<template lang="">
  <div>
    <div style="width: 100%; height: 120px; display: flex; align-items: center; flex-direction: column; text-align: center">
      <h3 style="font-size: 1.4rem; font-weight: 400; color: #4a4f55">Verify & Publish Contract Source Code</h3>
      <p class="subtitle">Compiler Type: SINGLE FILE / CONCATENANTED METHOD</p>
    </div>

    <div class="content">
      <el-tabs v-model="activeName" style="width: 100%">
        <el-tab-pane name="first">
          <template #label>
            <p style="font-size: 15px; font-weight: bold; margin-top: 0px; margin-left: 10px">Contract Source Code</p>
          </template>
          <div style="margin: 10px">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="title-input">
                  <p>Contract Address</p>
                  <el-input v-model="input" size="large" clearable />
                </div>
              </el-col>
              <el-col :span="10">
                <div class="title-input">
                  <p>Compiler</p>
                  <el-select v-model="compilerValue" placeholder="Select" size="large" style="width: 100%">
                    <el-option v-for="item in compilerOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="title-input">
                  <p>Optimization</p>
                  <el-select v-model="licenseValue" placeholder="Select" size="large" style="width: 100%">
                    <el-option v-for="item in licenseOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="margin: 10px">
            <h4>Enter the Solidity Contract Code below</h4>
            <textarea class="byte-codes-text" rows="10" style="margin-top: 0px; background-color: white"> </textarea>
          </div>

          <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 30px"><el-button type="primary" size="large">Verify and Publish</el-button></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "VerifyContractSubmit",
  data() {
    return {
      activeName: "first",
      input: "",
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
    console.log(this.$route.query);
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
.content {
  display: flex;
  width: 100%;
  // height: 500px;
  background-color: white;
  border-radius: 0.35rem;
}
.subtitle {
  border-radius: 5rem;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #00c9a7;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 75%;
  font-weight: 700;
  color: white;
  margin-top: 0px;
}
.title-input {
  font-size: 13px;
}
</style>
