<template lang="">
  <div>
    <div class="center-row">
      <el-icon :color="'green'"><CircleCheckFilled /></el-icon> &nbsp;
      <h4>Contract Source Code Verified</h4>
    </div>
    <div class="code-content-overview">
      <div style="width: 50%">
        <el-row type="flex" style="word-break: break-all">
          <el-col :span="8">Contract Name:</el-col>
          <el-col :span="16" class="bolder">{{ props.contractInfo.contractName }}</el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">Contract Version:</el-col>
          <el-col :span="16" class="bolder">{{ props.contractInfo.compilerVersion }}</el-col>
        </el-row>
      </div>
      <div style="width: 50%; margin-left: 3%">
        <el-row>
          <el-col :span="8">Optimization Enabled:</el-col>
          <el-col :span="16" class="bolder"
            >{{ props.contractInfo.runs === 0 ? 'No' : 'Yes' }} with {{ props.contractInfo.optimization }} runs</el-col
          >
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">Other Settings:</el-col>
          <el-col :span="16" class="bolder">
            default evmVersion, {{ licenseTypeMap.get(props.contractInfo.licenseType) }}
          </el-col>
        </el-row>
      </div>
    </div>

    <div style="margin-top: 20px">
      <div v-for="(code, index) in contractSourceList" :key="index">
        <div class="center-row">
          <el-icon><Document /></el-icon> &nbsp;
          <h4>Contract Source Code (Solidity)</h4>
        </div>
        <div style="display: flex; height: 50px; align-items: center">
          <div style="font-size: 13px">
            File {{ index + 1 }} of {{ contractSourceList.length }} : {{ code.filename }}
          </div>
          <div class="more-button-code">
            <el-button type="info">
              <copy-link :text="pageUrl"></copy-link>
            </el-button>
            <el-button type="info">
              <copy-icon-light :text="code.codeContent"></copy-icon-light>
            </el-button>
            <el-button v-if="code.isFull" type="info" @click="code.isFull = false">
              <el-icon><Minus /></el-icon>
            </el-button>
            <el-button v-else type="info" @click="code.isFull = true">
              <el-icon><FullScreen /></el-icon>
            </el-button>
          </div>
        </div>
        <code-view :codeData="code.codeContent" :isFull="code.isFull"></code-view>
      </div>
    </div>

    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Contract ABI</h4>
        <div class="more-button">
          <el-dropdown @command="handleCommand">
            <el-button type="info">
              Export ABI &nbsp;
              <el-icon><ArrowDownBold /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="json">JSON Format</el-dropdown-item>
                <el-dropdown-item command="raw">Raw/Text Format</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          &nbsp;
          <el-button type="info">
            <copy-icon-light :text="props.contractInfo.abi"></copy-icon-light>
          </el-button>
          <el-button v-if="abiFull" type="info" @click="switchFullScreen">
            <el-icon><Minus /></el-icon>
          </el-button>
          <el-button v-else type="info" @click="switchFullScreen">
            <el-icon><FullScreen /></el-icon>
          </el-button>
        </div>
      </div>
      <textarea ref="textareaRef" class="byte-codes-text" style="margin: 0px" rows="10" v-model="abi"> </textarea>
    </div>

    <div>
      <div class="center-row">
        <el-icon><Document /></el-icon> &nbsp;
        <h4>Contract Creation Code</h4>
      </div>
      <textarea class="byte-codes-text" style="margin: 0px" rows="10" v-model="creationCode"> </textarea>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { ContractContent } from '../../../script/model/contract';
import { CircleCheckFilled, Document } from '@element-plus/icons-vue';
import { GetVerifyContractMetadata } from '../../../script/service/contractService';
import { ArrowDownBold, FullScreen, Minus } from '@element-plus/icons-vue';

const props = defineProps({
  contractAddress: String,
  contractInfo: {
    type: Object as () => ContractContent,
  },
});
const contractSourceList = ref([] as any[]);
const abi = ref('');
const creationCode = ref('');
const textareaRef = ref<any>(null);
const abiFull = ref<Boolean>(false);
const pageUrl = ref('');

const metadataRes = await GetVerifyContractMetadata();
const licenseTypeMap = new Map();
metadataRes.data.licenseTypes.forEach((element) => {
  licenseTypeMap.set(element.id, element.name);
});

const handleCommand = (command: string | number | object) => {
  console.log('command', command);
};

watchEffect(async () => {
  pageUrl.value = window.location.href;

  if (Object.keys(props.contractInfo as ContractContent).length !== 0) {
    // console.log('code', props.contractInfo);
    abi.value = ((((props.contractInfo?.abi as string) + props.contractInfo?.abi) as string) +
      props.contractInfo?.abi +
      (props.contractInfo?.abi as string)) as string;
    // abi.value = props.contractInfo?.abi as string;
    creationCode.value = props.contractInfo?.object as string;
    Object.keys(props.contractInfo?.metadata).forEach((key) => {
      contractSourceList.value.push({
        filename: key,
        codeContent: props.contractInfo?.metadata[key],
        isFull: false,
      });
    });
    // console.log('contractSourceList', contractSourceList);
  }
});

const switchFullScreen = () => {
  abiFull.value = !abiFull.value;
  if (abiFull.value) {
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
  } else {
    textareaRef.value.style.height = '220px';
  }
};
</script>
<style lang="less" scoped>
@import '../../../css/style.css';
</style>
