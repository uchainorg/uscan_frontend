<template lang="">
  <div>
    <div class="center-row" style="font-size: 13px">
      <el-icon><Document /></el-icon>&nbsp;
      <p>Read Contract Information</p>
    </div>

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
              <el-button type="info" plain @click="query([functionObject])">Query</el-button>
            </div>
            <div v-for="(output, index) in functionObject.outputsRes" :key="index">
              <div class="method-output">
                <div>{{ output.arg }}</div>
                &nbsp;&nbsp;
                <div class="arg-type">{{ output.internalType }}</div>
              </div>
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
import { getResByNode } from "../../../js/node.js";
export default defineComponent({
  name: "readContract",
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
    };
  },
  watch: {
    activeNames(newVal, oldVal) {
      let activeFunctionObjectImmediately = [];
      let activeFunctionObjectWait = [];
      let active = newVal.filter((items) => oldVal.indexOf(items) == -1);
      if (active.length != 0) {
        active.forEach((element) => {
          // console.log("active", this.functionResMap.get(element));
          let functionObj = this.functionResMap.get(element);
          if (functionObj.inputs.length == 0) {
            activeFunctionObjectImmediately.push(functionObj);
          } else {
            let empty = true;
            functionObj.inputsArg.forEach((element) => {
              // console.log("arg", element);
              if (element.arg != "") {
                empty = false;
              }
            });
            if (!empty) {
              activeFunctionObjectWait.push(functionObj);
            }
          }
        });
        this.query(activeFunctionObjectWait);
        this.query(activeFunctionObjectImmediately);
      }
    },
  },
  created() {
    this.contractABICodeContent = this.contractABICode;
    if (JSON.parse(this.contractABICode).length != 0) {
      let index = 0;
      JSON.parse(this.contractABICode).forEach((element) => {
        if (element.stateMutability == "view") {
          // console.log(element);
          let inputsArg = [];
          element.inputs.forEach((element) => {
            inputsArg.push({
              arg: "",
              name: element.name,
              internalType: element.internalType,
            });
          });
          let outputsRes = [];
          element.outputs.forEach((element) => {
            outputsRes.push({
              arg: "",
              name: element.name,
              internalType: element.internalType,
            });
          });
          let method = {
            name: element.name,
            inputs: element.inputs,
            inputsArg: inputsArg,
            outputs: element.outputs,
            outputsRes: outputsRes,
          };
          this.functionObjectList.push(method);
          this.functionResMap.set(index, method);
          index += 1;
        }
      });
      this.activeNames = Array.from(new Array(this.functionObjectList.length).keys());
    }
  },
  methods: {
    async query(functionList) {
      if (functionList.length != 0) {
        const abi = this.contractABICodeContent;
        const iface = new ethers.utils.Interface(abi);
        const abiCoder = new ethers.utils.AbiCoder();
        let requests = [];
        functionList.forEach((element) => {
          console.log("functionList", element);
          console.log("function-select", iface.getSighash(element.name));
          // console.log("function-arg", abiCoder.encode(["address"], ["0x07861819F3D9773088F67e5572Bd645b2E5c15ef"]));
          let functionSelect = iface.getSighash(element.name);
          let data = "";
          if (element.inputs.length == 0) {
            data = functionSelect;
          } else {
            let requestHash = "";
            let typeList = [];
            let argList = [];
            element.inputs.forEach((element) => {
              typeList.push(element.internalType);
            });
            element.inputsArg.forEach((element) => {
              argList.push(element.arg);
            });
            // console.log("typeList", typeList);
            // console.log("argList", argList);
            requestHash = abiCoder.encode(typeList, argList).slice(2);
            console.log(requestHash);
            data = functionSelect + requestHash;
          }

          requests.push({
            method: "eth_call",
            params: [
              {
                from: "0x896bF09f7fEB337d2673B10647fdd32C3124CdF2",
                to: this.contractAddress,
                data: data,
              },
              "latest",
            ],
          });
        });
        let resMap = await getResByNode(this.$node_http, requests);
        resMap.forEach((value, key) => {
          let functionObject = functionList[key];
          let typeListResponse = [];
          let decodeRes = "";
          functionObject.outputs.forEach((element) => {
            typeListResponse.push(element.internalType);
          });
          if (value != "") {
            decodeRes = abiCoder.decode(typeListResponse, value);
          } else {
            decodeRes = ["error"];
          }
          console.log("decodeRes", decodeRes);
          // console.log(key);
          functionList[key].outputsRes[0].arg = value;
          functionObject.outputsRes.forEach((element, index) => {
            // console.log("index", index);
            // console.log("element", element);
            element.arg = decodeRes[index];
          });
        });
      }
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../../css/style.css";
.method-content {
  background-color: rgb(248, 247, 247);
}

.method-object {
  padding-top: 10px;
  background-color: rgb(248, 247, 247);
}

.method-output {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.function-object {
  border: 1px solid #e7eaf3;
  border-radius: 0.35rem;
  background-color: rgb(248, 247, 247);
  margin-top: 15px;
}
.function-title {
  display: flex;
  align-items: center;
  height: 35px;
  color: #343a40;
  font-size: 1rem;
  border-bottom: 1px solid #e7eaf3;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
}
.function-output {
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
  background-color: white;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
}

.function-input {
  padding: 0.75rem;
  background-color: white;
}
.arg-type {
  display: flex;
  align-items: center;
  font-style: italic;
  font-size: 13px;
  color: grey;
}
.res {
  display: flex;
  align-items: center;
}
</style>
