<template lang="">
  <div class="statistic-content">
    <div class="statistic">
      <div class="content-item-left">
        <div style="height: 50%">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="statistic-item">
                <div class="center">
                  <el-row>
                    <el-col>
                      <div class="show-item-title">Address total</div>
                    </el-col>
                    <el-col>
                      <div class="show-item">{{ parseInt(props.overview.address) }}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="statistic-item">
                <div class="center">
                  <el-row>
                    <el-col>
                      <div class="show-item-title">Average block time</div>
                    </el-col>
                    <el-col>
                      <div class="show-item">{{ parseInt(props.overview.avgBlockTime) }} s</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="statistic-item">
                <div class="center">
                  <el-row>
                    <el-col>
                      <div class="show-item-title">Block Height</div>
                    </el-col>
                    <el-col>
                      <div class="show-item">{{ parseInt(props.overview.block) }}</div>
                    </el-col>
                  </el-row>
                </div>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="statistic-item">
                <div class="center">
                  <el-row>
                    <el-col>
                      <div class="show-item-title">Daily txs</div>
                    </el-col>
                    <el-col>
                      <div class="show-item">{{ parseInt(props.overview.dailyTx) }}</div>
                    </el-col>
                  </el-row>
                </div>
              </div></el-col
            >
          </el-row>
        </div>

        <div style="height: 50%">
          <el-row :gutter="20">
            <el-col :span="6"
              ><div class="statistic-item">
                <div class="center">
                  <el-row>
                    <el-col>
                      <div class="show-item-title">Transactions</div>
                    </el-col>
                    <el-col>
                      <div class="show-item">
                        {{ parseInt(props.overview.tx) }} ({{ parseInt(props.overview.tps) }} TPS)
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div></el-col
            >
          </el-row>
        </div>
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
import { onMounted } from 'vue';
import { ECharts, EChartsOption, init } from 'echarts';
import { TransactionOverview, DailyTransactionCount } from '../../script/model/transaction';

const props = defineProps({
  overview: {
    type: Object as () => TransactionOverview,
  },
  dailyTransaction: {
    type: Array as () => Array<DailyTransactionCount>,
    require: true,
  },
});

const dataList: string[] = [];
const totalList: number[] = [];

onMounted(async () => {
  (props.dailyTransaction as DailyTransactionCount[]).forEach((element, index) => {
    // console.log(element);
    dataList.push(element.date.slice(0, 10));
    totalList.push(parseInt(element.txCount, 16));
    // totalList.push(35555 + index * 1000);
  });
  const maxVal = Number(Math.max(...totalList));
  const interval = 10 ** (maxVal.toString().length - 1);
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
      interval: interval,
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
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 20px;
}

.statistic-item {
  height: 66px;
  width: 100%;
  // background-color: red;
}

.chart-title {
  display: flex;
  justify-content: center;
  font-size: 0.76562rem;
  color: #77838f;
}

.show-item-title {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  color: #77838f;
}

.show-item {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-display {
  display: flex;
  justify-content: center;
  font-size: 0.96562rem;
  // color: #77838f;
}
</style>
