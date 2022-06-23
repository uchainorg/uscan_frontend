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
            <el-row :gutter="10">
              <el-col :span="7">
                <div class="title-input">
                  <p>Contract Name</p>
                  <el-input v-model="contractName" size="large" />
                </div>
              </el-col>
              <el-col :span="7">
                <div class="title-input">
                  <p>Contract Address</p>
                  <el-input v-model="input" size="large" :readonly="true" />
                </div>
              </el-col>
              <el-col :span="7">
                <div class="title-input">
                  <p>Compiler</p>
                  <el-select v-model="compilerVersion" size="large" style="width: 100%" disabled> </el-select>
                </div>
              </el-col>
              <el-col :span="3">
                <div v-if="this.$route.query.ct == 'solidity-single-file'" class="title-input">
                  <p>Optimization</p>
                  <el-select v-model="optimizationValue" placeholder="Select" size="large" style="width: 100%">
                    <el-option :key="1" :label="'Yes'" :value="1" />
                    <el-option :key="2" :label="'No'" :value="0" />
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-if="this.$route.query.ct == 'solidity-single-file'" style="margin: 10px">
            <h4>Enter the Solidity Contract Code below</h4>
            <textarea class="byte-codes-text" rows="10" style="margin-top: 0px; background-color: white" v-model="sourceCode"> </textarea>
          </div>
          <div v-else style="margin: 10px">
            <h4>Please select the Standard-Input-Json (*.json) file to upload</h4>
            <div>
              <div>
                <div><p>Click button select file</p></div>
                <div style="width: 30%">
                  <el-upload :auto-upload="false" action="Fake Action" accept=".json" :on-change="handleUploadChange" :file-list="fileList">
                    <el-button>Select a file</el-button>
                  </el-upload>
                </div>
                <div v-if="this.fileList.length == 0">
                  <p>No file selected</p>
                </div>
              </div>
            </div>
          </div>
          <div style="margin: 10px; margin-top: 30px">
            <el-collapse @change="handleChange">
              <el-collapse-item>
                <template #title>
                  <p>Misc Settings</p>
                  <p style="color: #77838f">(Runs, EvmVersion & License Type settings)</p>
                </template>
                <div>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <div v-if="this.optimizationValue == 1" class="title-input">
                        <p>Runs</p>
                        <el-input v-model="runsValue" size="large" />
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div v-if="this.$route.query.ct == 'solidity-single-file'" class="title-input">
                        <p>EVM Version to target</p>
                        <el-select v-model="compilerVersionOptionsValue" placeholder="Select" size="large" style="width: 100%" value-key="name">
                          <el-option v-for="item in compilerVersionOptions" :key="item.value.name" :label="item.label" :value="item.value" />
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="title-input">
                        <p>LicenseType</p>
                        <el-select v-model="licenseOptionsValue" placeholder="Select" size="large" style="width: 100%">
                          <el-option v-for="item in licenseOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div style="display: flex; justify-content: center; margin-top: 50px; margin-bottom: 30px">
            <el-button type="primary" size="large" @click="submit">Verify and Publish</el-button>
            <el-button type="info" size="large" @click="reset">Reset</el-button>
            <el-button type="info" size="large" @click="returnMain">Return to main</el-button>
          </div>
          <div v-if="this.submitRes == -1" class="submit-result">
            <div v-if="this.submittedStatus >= 200 && this.submittedStatus <= 300"><p>Submitted, please wait for verification( View validation results every three seconds)</p></div>
            <div v-else-if="this.submittedStatus >= 400 && this.submittedStatus <= 500">
              <p>Something wrong, {{ submittedError }}</p>
            </div>
          </div>
          <div v-else class="submit-result">
            <div v-if="this.submitRes == 1">Verify success!</div>
            <div v-else-if="this.submitRes == 2">Verify fail!</div>
            <div v-else-if="this.submitRes == 0">Verify handling!</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetVerifyMetadata, GetVerifySubmitStatus } from "../../js/request.js";
export default defineComponent({
  name: "VerifyContractSubmit",
  data() {
    return {
      activeName: "first",
      input: "",
      compilerVersion: "",
      licenseValue: 0,
      optimizationValue: "",
      contractName: "",
      contractAddress: "",
      licenseOptions: [],
      licenseOptionsValue: "",
      compilerVersionOptions: [],
      compilerVersionOptionsValue: "",
      fileList: [],
      submittedStatus: 100,
      submittedError: "",
      submitId: "",
      submitRes: -1,
      sourceCode: "",
      runsValue: 0,
    };
  },
  beforeCreate() {
    document.title = "Verify & Publish Contract Source Code | The Coq Explorer";
  },
  created() {
    // console.log(this.$route.query);
    this.input = this.$route.query.a;
    this.contractAddress = this.$route.query.a;
    this.compilerVersion = this.$route.query.cv;
    this.licenseValue = this.$route.query.lictype;
  },
  methods: {
    async getMeatData() {
      if (this.compilerVersionOptions.length != 0 || this.licenseOptions.length != 0) {
        return;
      }
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
    async handleChange() {
      await this.getMeatData();
    },
    handleUploadChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    submit() {
      let formdata = new FormData();
      if (this.licenseOptionsValue != "") {
        this.licenseValue = this.licenseOptionsValue;
      }
      if (this.compilerVersionOptionsValue != "") {
        this.compilerVersion = this.compilerVersionOptionsValue.name;
      }
      formdata.append("contractAddress", this.contractAddress);
      formdata.append("contractName", this.contractName);
      formdata.append("compilerType", this.$route.query.ct);
      formdata.append("compilerVersion", this.compilerVersion);
      formdata.append("compilerFileName", this.$route.query.cf);
      formdata.append("licenseType", this.licenseValue);
      if (this.fileList.length == 1) {
        formdata.append("file", this.fileList[0].raw, this.fileList[0].name);
      }
      if (this.$route.query.ct == "solidity-single-file") {
        formdata.append("sourceCode", this.sourceCode);
        formdata.append("optimization", this.optimizationValue == "" ? 0 : this.optimizationValue);
        formdata.append("runs", this.runsValue);
      }

      this.$rpc_http
        .post("/v1/contracts/" + this.contractAddress + "/verify", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log("res=>", res);
          this.submittedStatus = res.data.code;
          if (this.submittedStatus == 200) {
            this.submitId = res.data.data.id;
            setTimeout(this.getVerifySubmitStatus, 1000 * 5);
          }
        })
        .catch((e) => {
          console.log("e=>", e);
          this.submittedError = e;
        });
    },
    reset() {
      this.contractName = "";
      (this.licenseOptionsValue = ""), (this.compilerVersionOptionsValue = "");
      this.fileList = [];
      this.sourceCode = "";
      this.runsValue = 0;
    },
    returnMain() {
      this.$router.push("/verifyContract?a=" + this.$route.query.a);
    },
    async getVerifySubmitStatus() {
      if (this.submitRes < 0) {
        let status = await GetVerifySubmitStatus(this.$rpc_http, this.submitId);
        // console.log(status);
        this.submitRes = status;
      }
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
.content {
  display: flex;
  width: 100%;
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
.submit-result {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
