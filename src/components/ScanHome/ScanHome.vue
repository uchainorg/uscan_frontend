<template lang="">
  <div class="home-content">
    <div class="statistic">
      <scan-statistic :overview="res.data.metrics" :dailyTransaction="res.data.dateTxs"></scan-statistic>
    </div>

    <div v-if="pageWidth > 500" class="home-left">
      <scan-home-blocks :blocksData="res.data.blocks"></scan-home-blocks>
    </div>
    <div v-if="pageWidth > 500" class="home-right">
      <Suspense>
        <scan-home-transactions :txsData="res.data.txs"></scan-home-transactions>
      </Suspense>
    </div>
    <div v-if="pageWidth < 500" class="short-size">
      <scan-home-short :blocksData="res.data.blocks" :txsData="res.data.txs"></scan-home-short>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getTitle } from '../../script/global';
import { GetHome } from '../../script/service/homeService';
import { onMounted, ref } from 'vue';

const pageWidth = ref<number>(0);

onMounted(() => {
  console.log('width is', document.body.clientWidth);
  pageWidth.value = document.body.clientWidth;
});

const res = await GetHome();
// console.log('homePage', res.data);

document.title = 'Home | The ' + getTitle() + ' Explorer';
</script>
<style>
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
  /* .home-right {
    min-width: 200px;
  }
  .home-left {
    min-width: 200px;
  } */
  .statistic {
    /* display: none; */
  }
}

.statistic {
  margin-bottom: 15px;
}

.short-size {
  width: 100%;
}
</style>
