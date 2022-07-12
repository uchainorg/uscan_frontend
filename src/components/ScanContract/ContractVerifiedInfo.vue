<template lang="">
  <div>
    <el-row style="margin-top: 0.5%">
      <el-button type="info" plain @click="moveToCode">Code</el-button>
      <el-button type="info" plain @click="moveToRead">Read Contract</el-button>
      <el-button type="info" plain @click="moveToWrite">Write Contract</el-button>
    </el-row>
    <br />
    <component :is="comName" :contractAddress="props.contractAddress" :contractInfo="props.contractInfo"></component>
  </div>
</template>
<script lang="ts" setup>
import { shallowRef } from 'vue';
import { ContractContent } from '../../script/model/contract';
import codeContractVue from './ContractInfo/codeContract.vue';
import readContractVue from './ContractInfo/readContract.vue';
import writeContractVue from './ContractInfo/writeContract.vue';

const props = defineProps({
  contractAddress: String,
  contractInfo: {
    type: Object as () => ContractContent,
  },
});

const comName = shallowRef(codeContractVue);

const moveToCode = () => {
  comName.value = codeContractVue;
};

const moveToRead = () => {
  comName.value = readContractVue;
};

const moveToWrite = () => {
  comName.value = writeContractVue;
};
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
