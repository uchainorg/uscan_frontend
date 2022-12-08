<template lang="">
  <div>
    <el-table class="table-border" :data="props.holdersData" empty-text="loading..." :row-style="{ height: '50px' }">
      <template #empty>{{ emptyText }}</template>
      <el-table-column v-for="info in props.headerData" :key="info.key" :property="info.key" :label="info.label">
        <template v-slot:default="scope">
          <div v-if="scope.column.property == 'Address'">
            <router-link :to="'/address/' + scope.row[scope.column.property]">{{
              scope.row[scope.column.property]
            }}</router-link>
          </div>
          <div v-else-if="scope.column.property == 'Quantity'" style="width: 380px">
            {{ BigInt(parseInt(scope.row[scope.column.property])) }}
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

const emptyText = ref('loading...');
const props = defineProps({
  loadStatus: Boolean,
  holdersData: {
    type: Array as () => Array<TokenHolder>,
    require: true,
  },
  headerData: {
    type: Array as () => Array<TableHeader>,
    require: true,
  },
});

watchEffect(() => {
  if (!props.loadStatus) {
    emptyText.value = 'empty data';
  }
});
</script>
<style lang=""></style>
