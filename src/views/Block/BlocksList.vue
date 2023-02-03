<template lang="">
  <div>
    <h4 class="h4-title">Blocks</h4>
    <GenerateBlocks :blocksData="blocksData" :headerData="BlocksHeaderList"></GenerateBlocks>
    <div style="margin-top: 1%; display: flex; justify-content: center">
      <el-pagination
        small
        background
        :currentPage="currentPageIndex"
        :page-size="pageSizeNumber"
        :page-sizes="[10, 25, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { GetBlocks } from '@/apis/block';
import { BlockDetail, BlocksHeaderList } from '@/model/block';
import { reactive, ref, computed } from 'vue';
import { useCustomizationParametersStore } from '@/store/customizationParameters';
import GenerateBlocks from '@/views/Block/GenerateBlocks.vue';

const appTitle = computed(() => useCustomizationParametersStore().appTitle);
document.title = 'Blocks | The ' + appTitle.value + ' Explorer';

const currentPageIndex = ref(1);
const pageSizeNumber = ref(25);
const blocksData: BlockDetail[] = reactive([]);
const res = await GetBlocks(true, currentPageIndex.value - 1, pageSizeNumber.value);
res.data.items.forEach((element) => {
  blocksData.push(element);
});
const total = ref(res.data.total);

const handleSizeChange = async (pageSizeArg: number) => {
  blocksData.length = 0;
  currentPageIndex.value = 1;
  pageSizeNumber.value = pageSizeArg;
  const res = await GetBlocks(true, currentPageIndex.value - 1, pageSizeNumber.value);
  res.data.items.forEach((element) => {
    blocksData.push(element);
  });
  total.value = res.data.total;
};

const handleCurrentChange = async (currentPageArg: number) => {
  blocksData.length = 0;
  currentPageIndex.value = currentPageArg;
  const res = await GetBlocks(true, currentPageIndex.value - 1, pageSizeNumber.value);
  res.data.items.forEach((element) => {
    blocksData.push(element);
  });
  total.value = res.data.total;
};
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
