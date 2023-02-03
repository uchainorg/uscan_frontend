<template lang="">
  <el-table class="table-border" :data="props.blocksData" empty-text="loading..." :row-style="{ height: '50px' }">
    <el-table-column v-for="info in props.headerData" :key="info.key" :property="info.key" :label="info.label">
      <template v-slot:default="scope">
        <div v-if="scope.column.property == 'number'">
          <router-link :to="'/block/' + parseInt(scope.row[scope.column.property])">
            {{ parseInt(scope.row[scope.column.property]) }}
          </router-link>
        </div>
        <div v-if="scope.column.property == 'timestamp'">
          {{ getAge(scope.row[scope.column.property]) }}
        </div>
        <div v-else-if="scope.column.property == 'gasUsed'">
          {{ ethersFormatUnits(scope.row[scope.column.property]) }}
        </div>
        <div v-else-if="scope.column.property == 'gasLimit'">
          {{ ethersFormatUnits(scope.row[scope.column.property]) }}
        </div>
        <div v-else-if="scope.column.property == 'baseFeePerGas'">
          {{ ethersFormatUnits(scope.row[scope.column.property]) }}
        </div>
        <div v-else-if="scope.column.property == 'miner'" style="width: 180px">
          <router-link :to="'/address/' + scope.row.miner"> {{ scope.row.miner.slice(0, 18) + '...' }} </router-link>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { BlockDetail } from '@/model/block';
import { TableHeader } from '@/model/index';
import { getAge } from '@/utils/utils';
import { ethersFormatUnits } from '@/utils/ethersUtils';

const props = defineProps({
  blocksData: {
    type: Array as () => Array<BlockDetail>,
    require: true,
  },
  headerData: {
    type: Array as () => Array<TableHeader>,
    require: true,
  },
});
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
