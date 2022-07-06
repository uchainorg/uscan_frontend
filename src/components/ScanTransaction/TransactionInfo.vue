<template lang="">
  <div>
    <div style="margin-bottom: -20px">
      <h4 class="h4-title">Transactions Details</h4>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="Overview" name="first">
        <transaction-overview :txHash="props.txHash"></transaction-overview>
      </el-tab-pane>
      <!-- <el-tab-pane v-if="this.logCount != 0" name="second">
        <template #label>
          <span>Logs({{ logCount }})</span>
        </template>
        <transaction-logs :data="transactionLogsData"></transaction-logs>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
  txHash: String,
});
const activeName = ref('first');
</script>
<style lang=""></style>
