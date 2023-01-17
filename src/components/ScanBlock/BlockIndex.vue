<template lang="">
  <div>
    <div style="margin-bottom: -20px">
      <h4 class="h4-title">
        Block<span class="small text-secondary">&nbsp;&nbsp;#{{ blockNumber }}</span>
      </h4>
    </div>
    <el-tabs v-model="activeName" style="">
      <el-tab-pane label="Overview" name="first">
        <Suspense>
          <block-overview :blockNumber="parseInt(blockNumber)"></block-overview>
        </Suspense>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  blockNumber: String,
});
document.title = 'Blocks #' + props.blockNumber;
const activeName = ref('first');
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
