<template lang="">
  <div>
    <el-table class="table-border" :data="props.holdersData" empty-text="loading..." :row-style="{ height: '50px' }">
      <template #empty>{{ emptyText }}</template>
      <el-table-column
        v-for="info in props.headerData"
        :key="info.key"
        :property="info.key"
        :label="info.label"
        :min-width="columnWidth(info.label)"
      >
        <template v-slot:default="scope">
          <div v-if="scope.column.property == 'rank'">
            {{ (props.pageIndex - 1) * props.pageSize + (scope.$index + 1) }}
          </div>
          <div v-else-if="scope.column.property == 'Address'">
            <router-link :to="'/address/' + scope.row[scope.column.property]">{{
              scope.row[scope.column.property]
            }}</router-link>
          </div>
          <div v-else-if="scope.column.property == 'Quantity'">
            {{ thousandsFormat(ethers.utils.formatUnits(scope.row[scope.column.property], props.decimals)) }}
            <!-- {{  BigInt(parseInt(scope.row[scope.column.property])) }} -->
          </div>
          <div v-else-if="scope.column.property == 'percentage'">
            {{
              (
                (parseFloat(ethers.utils.formatUnits(scope.row.Quantity, props.decimals)) / parseFloat(totalSupply)) *
                100
              ).toFixed(4) + '%'
            }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { TokenHolder } from '../../script/model/token';
import { TableHeader } from '../../script/model/index';
import { ref, watchEffect } from 'vue';
import { ethers } from 'ethers';
import { thousandsFormat } from '../../script/utils';

const emptyText = ref('loading...');
const props = defineProps({
  loadStatus: Boolean,
  decimals: Number,
  holdersData: {
    type: Array as () => Array<TokenHolder>,
    require: true,
  },
  headerData: {
    type: Array as () => Array<TableHeader>,
    require: true,
  },
  totalSupply: Number,
  pageSize: Number,
  pageIndex: Number,
});

const totalSupply = ref(0);

const columnWidth = (item: any) => {
  let widthStr = '20%';
  switch (item) {
    case 'Address':
      widthStr = '40%';
  }
  return widthStr;
};

watchEffect(() => {
  console.log('totalSupply', (props.totalSupply as number) * Math.pow(10, -(props.decimals as number)));
  totalSupply.value = (props.totalSupply as number) * Math.pow(10, -(props.decimals as number));
  if (!props.loadStatus) {
    emptyText.value = 'empty data';
  }
});
</script>
<style lang=""></style>
