<template>
  <div class="home-content">
    <div class="statistic">
      <HomeStatistic :overview="res.data.metrics" :dailyTransaction="res.data.dateTxs"></HomeStatistic>
    </div>

    <div class="home-left">
      <HomeBlocks :blocksData="res.data.blocks"></HomeBlocks>
    </div>
    <div class="home-right">
      <HomeTransactions :txsData="res.data.txs"></HomeTransactions>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { GetHome } from '@/apis/home';
import HomeBlocks from '@/views/Home/HomeBlocks.vue';
import HomeStatistic from '@/views/Home/HomeStatistic.vue';
import HomeTransactions from '@/views/Home/HomeTransactions.vue';
import { useCustomizationParametersStore } from '@/store/customizationParameters';

const res = await GetHome();
const appTitle = computed(() => useCustomizationParametersStore().appTitle);

document.title = 'Home | The ' + appTitle.value + ' Explorer';
</script>
<style lang="less" scoped>
.home-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.home-right {
  justify-content: flex-end;
  margin-left: auto;
  min-width: 665px;
}

.home-left {
  min-width: 665px;
}

.statistic {
  margin-bottom: 15px;
}

@media screen {
  @media (max-width: 500px) {
    .el-table__header,
    .el-table__body,
    .el-table__footer {
      width: 100% !important;
      table-layout: fixed !important;
    }
    .home-right {
      justify-content: flex-end;
      margin-left: auto;
      width: 30% !important;

      background-color: red;
    }
    .home-left {
      width: 30% !important;
      background-color: red;
    }
  }
}
</style>
