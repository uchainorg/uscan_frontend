<template lang="">
  <div>
    <div style="margin-bottom: -20px">
      <h4 class="h4-title">Transactions Details</h4>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="Overview" name="txs">
        <transaction-overview :txHash="props.txHash"></transaction-overview>
      </el-tab-pane>
      <el-tab-pane v-if="logCount != 0" name="logs">
        <template #label>
          <span>Logs({{ logCount }})</span>
        </template>
        <transaction-logs :transactionLogs="transactionLogsData"></transaction-logs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { GetTxLog } from '../../script/service/transactionService';

const props = defineProps({
  txHash: String,
});
const activeName = ref('txs');
const logCount = ref(0);

const res = await GetTxLog(props.txHash as string);
logCount.value = res.data.total;
const transactionLogsData = res.data.items;
// console.log('GetTxLog', res);
</script>
<style lang=""></style>
