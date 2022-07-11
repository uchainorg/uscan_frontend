<template lang="">
  <div>
    <el-row style="margin-top: 0.5%">
      <el-button type="info" plain @click="moveToCode">Code</el-button>
      <el-button type="info" plain @click="moveToCode">Read Contract</el-button>
      <el-button type="info" plain @click="moveToCode">Write Contract</el-button>
    </el-row>
    <br />
    <component :is="comName" :contractAddress="props.contractAddress" :contractInfo="props.contractInfo"></component>
  </div>
</template>
<script lang="ts" setup>
import { shallowRef } from 'vue';
import { ContractContent } from '../../script/model/contract';
import codeContent from './ContractInfo/codeContract.vue';

const props = defineProps({
  contractAddress: String,
  contractInfo: {
    type: Object as () => ContractContent,
  },
});

const comName = shallowRef(codeContent);

const moveToCode = () => {
  comName.value = codeContent;
};
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
