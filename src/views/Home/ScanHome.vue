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
import { GetHome } from '@/apis/home';
import HomeBlocks from '@/views/Home/HomeBlocks.vue';
import HomeStatistic from '@/views/Home/HomeStatistic.vue';
import HomeTransactions from '@/views/Home/HomeTransactions.vue';
import { useCustomizationParametersStore } from '@/store/customizationParameters';

const res = await GetHome();
const customizationParametersStore = useCustomizationParametersStore();

document.title = 'Home | The ' + customizationParametersStore.appTitle + ' Explorer';
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

@media screen and (max-width: 500px) {
  .home-right {
    min-width: 200px;
  }
  .home-left {
    min-width: 200px;
  }
}

.statistic {
  margin-bottom: 15px;
}

@media screen {
  @media (max-width: 500px) {
    .statistic {
      display: none;
    }
  }
}
</style>
