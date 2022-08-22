<template lang="">
  <div class="statistic-content">
    <div class="statistic" style="margin-top: 30px">
      <div class="content-item-left">
        <p class="chart-title">TRANSACTIONS</p>
        <p class="item-display">{{ tx }} ({{ tps }} TPS)</p>
      </div>
      <div class="content-item-left">
        <p class="chart-title">DIFFICULTY</p>
        <p class="item-display">119</p>
      </div>
    </div>
    <div class="statistic">
      <div class="content-item-right">
        <p class="chart-title">TRANSACTION HISTORY IN 14 DAYS</p>
        <div id="char" style="width: 700px; height: 200px; margin-top: -60px"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { GetTxTotal, GetTxOverview } from '../../script/service/transactionService';
import moment from 'moment';
import { ECharts, EChartsOption, init } from 'echarts';

const dataList: string[] = [];
const totalList: number[] = [];

const diff = ref(0);
const tps = ref(0);
const tx = ref(0);

onMounted(async () => {
  const overviewRes = await GetTxOverview();
  diff.value = overviewRes.data.diff;
  tps.value = overviewRes.data.tps;
  tx.value = overviewRes.data.tx;

  const res = await GetTxTotal(moment().subtract(14, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD'));
  res.data.data.forEach((element) => {
    dataList.push(element.Date.slice(0, 10));
    totalList.push(element.TxCount);
  });
  // console.log('GetTxTotal', res.data.data);
  const charEle = document.getElementById('char') as HTMLElement;
  const charEch: ECharts = init(charEle);
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: dataList,
      // show:false,
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      interval: 100,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        data: totalList,
        type: 'line',
        smooth: true,
      },
    ],
  };
  charEch.setOption(option);
  document.getElementById('char')!.setAttribute('_echarts_instance_', '');
});
</script>
<style lang="less" scoped>
.statistic-content {
  display: flex;
  flex-direction: row;
  width: 1350px;
  height: 170px;
  background-color: white;
  border-radius: 0.35rem;
  flex-wrap: wrap;
}
.statistic-left {
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  // background-color: red;
}
.statistic {
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  // background-color: blue;
}
.content-item {
  width: 100%;
  height: 80%;
  // background-color: red;
  // border-right-style: solid;
  border-color: #8c98a4;
}

.content-item-right {
  width: 100%;
  height: 80%;
  // background-color: red;
  border-left-style: solid;
  border-color: #8c98a4;
}

.content-item-left {
  width: 100%;
  height: 80%;
}

.chart-title {
  display: flex;
  justify-content: center;
  font-size: 0.76562rem;
  color: #77838f;
}

.item-display {
  display: flex;
  justify-content: center;
  font-size: 0.96562rem;
  // color: #77838f;
}
</style>
