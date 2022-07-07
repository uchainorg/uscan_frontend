<template lang="">
  <el-table class="table-border" :data="props.txsData" empty-text="loading..." :row-style="{ height: '50px' }">
    <template #empty>{{ emptyText }}</template>
    <el-table-column v-for="info in props.headerData" :key="info.key" :property="info.key" :label="info.label">
      <template v-slot:default="scope">
        <div v-if="scope.column.property == 'hash'" style="width: 170px">
          <router-link :to="'/tx/' + scope.row[scope.column.property]">{{
            scope.row[scope.column.property].slice(0, 15) + '...'
          }}</router-link>
        </div>
        <div v-else-if="scope.column.property == 'transactionHash'" style="width: 170px">
          <router-link :to="'/tx/' + scope.row[scope.column.property]">{{
            scope.row[scope.column.property].slice(0, 15) + '...'
          }}</router-link>
        </div>
        <div v-else-if="scope.column.property == 'blockNumber'">
          <router-link :to="'/block/' + parseInt(scope.row[scope.column.property])">{{
            parseInt(scope.row[scope.column.property])
          }}</router-link>
        </div>
        <div v-else-if="scope.column.property == 'createTime'">
          {{ getAge(scope.row[scope.column.property]) }}
        </div>
        <div v-else-if="scope.column.property == 'createdTime'">
          {{ getAge(scope.row[scope.column.property]) }}
        </div>
        <div v-else-if="scope.column.property == 'from'" style="width: 170px">
          <!-- <router-link :to="'/address/' + scope.row[scope.column.property]">{{
              scope.row[scope.column.property].slice(0, 15) + '...'
            }}</router-link> -->
          {{ scope.row[scope.column.property].slice(0, 15) + '...' }}
        </div>
        <div v-else-if="scope.column.property == 'to'" style="width: 170px">
          <!-- <router-link :to="'/address/' + scope.row[scope.column.property]">{{
            scope.row[scope.column.property].slice(0, 15) + '...'
          }}</router-link> -->
          {{ scope.row[scope.column.property].slice(0, 15) + '...' }}
        </div>
        <div v-else-if="scope.column.property == 'value'">
          <!-- {{ ethers.utils.formatUnits(BigInt(parseInt(scope.row[scope.column.property]).toString(), 18)) }} -->
          {{ ethers.utils.formatUnits(scope.row[scope.column.property], 18) }}
        </div>
        <div v-else-if="scope.column.property == 'gas'" style="font-size: 11px">
          {{ ethers.utils.formatUnits(scope.row[scope.column.property], 18) }}
        </div>
        <div v-else-if="scope.column.property == 'token'" style="width: 170px; font-size: 11px">
          <!-- <router-link :to="'/token/' + scope.row[scope.column.property]">{{
            scope.row[scope.column.property].slice(0, 15) + '...'
          }}</router-link> -->
          {{ scope.row[scope.column.property].slice(0, 15) + '...' }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { TransactionDetail } from '../../script/model/transaction';
import { TableHeader } from '../../script/model/index';
import { getAge } from '../../script/utils';
import { ethers } from 'ethers';
import { ref } from 'vue';

const emptyText = ref('loading...');
const props = defineProps({
  txsData: {
    type: Array as () => Array<TransactionDetail>,
    require: true,
  },
  headerData: {
    type: Array as () => Array<TableHeader>,
    require: true,
  },
});
if (props.txsData?.length === 0) {
  emptyText.value = 'No data found';
}
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
