<template lang="">
  <div>
    <div class="center-row" style="font-size: 13px">
      <el-icon><Document /></el-icon>&nbsp;
      <p>Write Contract Information</p>
    </div>
    <el-button type="info" plain @click="connect">Connect to MetaMask({{ this.metaMaskState ? "Connected" : "Unconnected" }})</el-button>
    <div v-for="(functionObject, index) in this.functionObjectList" :key="index">
      <el-collapse class="method-content" v-model="activeNames">
        <el-collapse-item class="method-object" :title="index + 1 + '.' + functionObject.name" :name="index">
          <div style="padding-right: 0.5rem; padding-left: 0.5rem">
            <div v-for="(input, inputIndex) in functionObject.inputsArg" :key="inputIndex">
              <div>
                <div style="font-size: 9px">{{ input.name + "(" + input.internalType + ")" }}</div>
                <el-input v-model="input.arg" :placeholder="input.name + '(' + input.internalType + ')'" />
              </div>
            </div>
            <div style="margin-top: 5px" v-if="functionObject.inputsArg.length != 0">
              <el-button type="info" plain @click="write(functionObject)">Write</el-button>
            </div>
            <div v-for="(output, index) in functionObject.outputsRes" :key="index">
              <div class="method-output">
                <div>{{ output.arg }}</div>
                &nbsp;&nbsp;
                <div class="arg-type">{{ output.internalType }}</div>
              </div>
            </div>
            <div v-if="functionObject.resMsg != ''">
              <p>{{ functionObject.resMsg }}</p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { ethers } from "ethers";
export default defineComponent({
  name: "writeContract",
  props: {
    contractABICode: {
      type: String,
      require: true,
    },
    contractAddress: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      contractABICodeContent: "",
      activeNames: [],
      functionObjectList: [],
      functionResMap: new Map(),
      metaMaskState: false,
    };
  },
  created() {
    this.contractABICodeContent = this.contractABICode;
    // console.log(this.contractABICodeContent);
    if (JSON.parse(this.contractABICode).length != 0) {
      let index = 0;
      for (let i = 0; i < JSON.parse(this.contractABICode).length; i++) {
        let element = JSON.parse(this.contractABICode)[i];
        if (element.stateMutability == "nonpayable") {
          if (element.inputs.length == 0 && element.outputs.length == 0) {
            continue;
          }
          let inputsArg = [];
          if (element.inputs.length != 0) {
            element.inputs.forEach((element) => {
              inputsArg.push({
                arg: "",
                name: element.name,
                internalType: element.internalType,
              });
            });
          }
          console.log("inputsArg", inputsArg);

          let outputsRes = [];
          // console.log("element.outputs.length", "outputs" in element);
          if ("outputs" in element) {
            if (element.outputs.length != 0) {
              element.outputs.forEach((element) => {
                outputsRes.push({
                  arg: "",
                  name: element.name,
                  internalType: element.internalType,
                });
              });
            }
          }
          // console.log("outputsRes", outputsRes);
          let method = {
            name: element.name,
            inputs: element.inputs,
            inputsArg: inputsArg,
            outputs: element.outputs,
            outputsRes: outputsRes,
            resMsg: "",
          };
          this.functionObjectList.push(method);
          this.functionResMap.set(index, method);
          index += 1;
        }
      }
      this.activeNames = Array.from(new Array(this.functionObjectList.length).keys());
      window.ethereum._state.accounts.length != 0 ? (this.metaMaskState = true) : (this.metaMaskState = false);
    }
  },
  methods: {
    async connect() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      window.ethereum._state.accounts.length != 0 ? (this.metaMaskState = true) : (this.metaMaskState = false);
    },
    async write(functionObject) {
      if (JSON.parse(this.contractABICode).length != 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (!this.metaMaskState) {
          await provider.send("eth_requestAccounts", []);
        }
        const signer = provider.getSigner();
        const contract = new ethers.Contract(this.contractAddress, this.contractABICode, provider);
        const contractWithSigner = contract.connect(signer);
        console.log("function", contractWithSigner.functions);
        Reflect.ownKeys(contractWithSigner.functions).forEach(async function (key) {
          if (key == functionObject.name) {
            let requestArgList = [];
            functionObject.inputsArg.forEach((element) => {
              requestArgList.push(element.arg);
            });
            try {
              let tx = await contractWithSigner.functions[key](...requestArgList);
              functionObject.resMsg = "success";
              console.log(tx);
            } catch (err) {
              // console.log("err", err.reason);
              functionObject.resMsg = err.reason;
            }
            // let tx = await
          }
          //   console.log(key);
          //   console.log(contractWithSigner.functions[key]);
          //   console.log(functionObject.name);
        });
      }
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../../css/style.css";
</style>
