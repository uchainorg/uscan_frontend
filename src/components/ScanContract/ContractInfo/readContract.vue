<template lang="">
  <div>
    <div class="center-row" style="font-size: 13px">
      <el-icon><Document /></el-icon>&nbsp;
      <p>Read Contract Information</p>
    </div>

    <div v-for="(functionObject, index) in functionObjectList" :key="index">
      <el-collapse class="method-content" v-model="activeNames">
        <el-collapse-item
          class="method-object"
          :title="'&nbsp;&nbsp;&nbsp;&nbsp;' + (index + 1) + '.' + functionObject.name"
          :name="index"
        >
          <div style="padding-right: 1rem; padding-left: 1rem">
            <div v-for="(input, inputIndex) in functionObject.inputsArg" :key="inputIndex">
              <div style="margin-top: 0.8rem">
                <div style="font-size: 9px">{{ input.name + '(' + input.internalType + ')' }}</div>
                <el-input v-model="input.arg" :placeholder="input.name + '(' + input.internalType + ')'" />
              </div>
            </div>
            <div style="margin-top: 0.8rem" v-if="functionObject.inputsArg.length != 0">
              <el-button type="info" plain @click="query([functionObject])">Query</el-button>
            </div>
            <div style="margin-top: 0.8rem">
              <div v-for="(output, index) in functionObject.outputsRes" :key="index">
                <div class="method-output">
                  <div>{{ resDisplayMap.map.get(functionObject.name + '-' + index) }}</div>
                  &nbsp;&nbsp;
                  <div class="arg-type">{{ output.internalType }}</div>
                </div>
              </div>
            </div>
            <div v-if="functionObject.resMsg != ''">
              <p style="color: red">{{ functionObject.resMsg }}</p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import { ContractContent } from '../../../script/model/contract';
import { GetResByNode } from '../../../script/service/nodeService';
import { Document } from '@element-plus/icons-vue';
import { ethers } from 'ethers';
import { getNodeUrl } from '../../../script/global';

const props = defineProps({
  contractAddress: String,
  contractInfo: {
    type: Object as () => ContractContent,
  },
});

// const functionObjectList = ref([] as any[]);
const functionObjectList = reactive([] as any[]);
// const functionObjectList = ref([] as any[]);

const activeNames = ref([] as number[]);
const nodeUrl = ref('');

const resDisplayMap = reactive({
  map: new Map(),
});
// const functionObjectList: any[] = [];
const functionResMap = new Map();
const abi = (props.contractInfo as unknown as ContractContent).abi as string;

watch(activeNames, (newVal, oldVal) => {
  // console.log('newVal', newVal);
  const activeFunctionObjectImmediately: any[] = [];
  // const activeFunctionObjectWait: any[] = [];
  const active: any[] = newVal.filter((items) => oldVal.indexOf(items) == -1);
  // console.log('active', active);
  if (active.length != 0) {
    active.forEach((element) => {
      const functionObj = functionResMap.get(element);
      if (functionObj.inputs) {
        if (functionObj.inputs.length === 0) {
          activeFunctionObjectImmediately.push(functionObj);
          // console.log('functionObj watch', functionObj);
        }
      }
    });
    query(activeFunctionObjectImmediately);
  }
});

const initData = () => {
  console.log('node url is', getNodeUrl());
  nodeUrl.value = getNodeUrl();
  if (Object.keys(props.contractInfo as ContractContent).length !== 0) {
    activeNames.value = [];
    let index = 0;
    JSON.parse(abi).forEach((elementFunc: any) => {
      if (elementFunc.stateMutability == 'view' && elementFunc.type == 'function') {
        const inputsArg: any[] = [];
        if (elementFunc.inputs) {
          elementFunc.inputs.forEach((element: any) => {
            inputsArg.push({
              arg: '',
              name: element.name,
              internalType: element.type,
            });
          });
        }
        const outputsRes: any = [];
        if (elementFunc.outputs) {
          elementFunc.outputs.forEach((element: any, index: number) => {
            outputsRes.push({
              arg: '',
              name: element.name,
              internalType: element.type,
            });

            resDisplayMap.map.set(elementFunc.name + '-' + index, '');
          });
        }
        const functionObject = {
          name: elementFunc.name,
          inputs: elementFunc.inputs,
          inputsArg: inputsArg,
          outputs: elementFunc.outputs,
          outputsRes: outputsRes,
          resMsg: '',
        };
        functionObjectList.push(functionObject);
        functionResMap.set(index, functionObject);
        index += 1;
      }
    });
    activeNames.value = Array.from(new Array(functionObjectList.length).keys());
    // console.log('functionObjectList', functionObjectList.value);
    // console.log('activeNames', activeNames.value);
    // console.log('resDisplayMap', resDisplayMap);
  }
};

initData();

const query = async (functionList: any[]) => {
  if (functionList.length !== 0) {
    // console.log('query', functionList);
    const iface = new ethers.utils.Interface(abi);
    const abiCoder = new ethers.utils.AbiCoder();
    const requests: any[] = [];
    functionList.forEach((element) => {
      const functionSelect: string = iface.getSighash(element.name);
      let data = '';
      if (element.inputs.length == 0) {
        data = functionSelect;
      } else {
        let requestHash = '';
        const typeList: any[] = [];
        const argList: any[] = [];
        element.inputs.forEach((element: any) => {
          typeList.push(element.type);
        });
        element.inputsArg.forEach((element: any) => {
          argList.push(element.arg);
        });
        try {
          requestHash = abiCoder.encode(typeList, argList).slice(2);
        } catch (err: any) {
          console.log('err', err.reason);
          element.resMsg = err.reason;
        }
        console.log('requestHash', requestHash);
        data = functionSelect + requestHash;
      }
      requests.push({
        method: 'eth_call',
        params: [
          {
            from: props.contractAddress as string,
            to: props.contractAddress as string,
            data: data,
          },
          'latest',
        ],
      });
    });
    // console.log('requests', requests);
    const resMap = await GetResByNode(requests, nodeUrl.value);
    resMap.forEach((value, key) => {
      const functionObject = functionList[key];
      // console.log('functionObject ooo', functionObject);
      const typeListResponse: any[] = [];
      let decodeRes: any[] = [];
      functionObject.outputs.forEach((element: any) => {
        typeListResponse.push(element.type);
      });
      if (value != '') {
        decodeRes = abiCoder.decode(typeListResponse, value) as any[];
      } else {
        typeListResponse.forEach(() => {
          decodeRes.push('error');
        });
      }
      // functionList[key].outputsRes[0].arg = value;
      functionObject.outputsRes.forEach((element: any, index: number) => {
        element.arg = '';
        // console.log('decodeRes[index]', decodeRes[index]);

        element.arg = decodeRes[index];

        resDisplayMap.map.set(functionObject.name + '-' + index, decodeRes[index]);
      });
      // console.log('functionObject', functionObject);
    });
  }
};
</script>
<style lang="less" scoped>
@import '../../../css/style.css';
</style>
