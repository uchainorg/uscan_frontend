<template lang="">
  <div>
    <el-row>
      <el-col :span="12">
        <div>
          <h4 class="h4-title">Transactions Details</h4>
        </div>
      </el-col>
      <el-col :span="12" class="more-info">
        <div class="more-button">
          <el-dropdown @command="handleCommand">
            <el-button style="width: 5px" type="info" size="small">
              <el-icon><MoreFilled /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- <el-dropdown-item command="tracetx">Geth Debug Trace</el-dropdown-item> -->
                <el-dropdown-item command="tracetx2">Geth Debug Trace_2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName">
      <el-tab-pane label="Overview" name="txs">
        <transaction-overview :txOverviews="overviews"></transaction-overview>
      </el-tab-pane>
      <el-tab-pane v-if="logCount != 0" name="logs">
        <template #label>
          <span>Logs({{ logCount }})</span>
        </template>
        <transaction-logs :transactionLogs="logs"></transaction-logs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { MoreFilled } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { GetTxByHash } from '../../script/service/transactionService';
import { getTxOverviews } from '../../script/model/transaction';

const props = defineProps({
  txHash: String,
});
const activeName = ref('txs');
const logCount = ref(0);
const overviews: any[] = reactive([]);
const logs: any[] = reactive([]);
const route = useRoute();
const router = useRouter();
const handleCommand = (command: string | number | object) => {
  console.log('command', command);
  if (command == 'tracetx2') {
    router.push((('/vmtrace?txhash=' + props.txHash) as string) + '&type=' + command);
  } else if (command == 'tracetx') {
    router.push((('/vmtrace?txhash=' + props.txHash) as string) + '&type=' + command);
  }
};
const initData = async (txHash: String) => {
  overviews.length = 0;
  logs.length = 0;
  const res = await GetTxByHash(txHash as string);
  logCount.value = res.data.logs.length;
  getTxOverviews(res.data).forEach((element) => {
    // console.log(element);
    overviews.push(element);
  });
  res.data.logs.forEach((element) => {
    logs.push(element);
  });
};

initData(props.txHash as string);

watch(
  () => route.params,
  async (val) => {
    if (val.txHash) {
      initData(val.txHash as unknown as string);
    }
  }
);
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
