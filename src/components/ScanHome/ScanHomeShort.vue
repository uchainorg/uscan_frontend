<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Latest Blocks</span>
      </div>
    </template>
    <div v-for="(block, index) in props.blocksData" :key="index">
      <el-card class="box-card">
        <div>
          Block &nbsp;
          <router-link :to="'/block/' + parseInt(block.number)">{{ parseInt(block.number) }}</router-link> &nbsp;
          <span style="font-size: 0.8rem; color: #8c98a4">{{ getAge(block.timestamp) }}</span>
        </div>
        <div style="margin-top: 1%">
          Miner &nbsp;
          <router-link :to="'/address/' + block.miner"> {{ block.miner.slice(0, 25) + '...' }}</router-link> &nbsp;
        </div>
        <div style="margin-top: 1%">
          <div v-if="block.transactionsTotal == 0">
            0 txns &nbsp;
            <el-tag type="info">
              {{ ethers.utils.formatUnits(block.gasUsed.toString(), 18) }} {{ getUnitDisplay() }}
            </el-tag>
          </div>
          <div v-else>
            <router-link :to="'/txs/all?block=' + parseInt(block.number)">
              {{ block.transactionsTotal }} txns
            </router-link>
            &nbsp;
            <el-tag type="info">
              {{ ethers.utils.formatUnits(block.gasUsed.toString(), 18) }} {{ getUnitDisplay() }}
            </el-tag>
          </div>
        </div>
      </el-card>
    </div>
  </el-card>
  <div class="center">
    <el-button class="home-bottom-button" type="primary" plain @click="moveToBlocks">View all Blocks</el-button>
  </div>
  <br />

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Latest Transactions</span>
      </div>
    </template>
    <div v-for="(tx, index) in props.txsData" :key="index">
      <el-card class="box-card">
        <div>
          TX# &nbsp;
          <router-link :to="'/tx/' + tx.hash"> {{ tx.hash.slice(0, 19) + '...' }}</router-link>
        </div>
        <div style="margin-top: 1%">
          From &nbsp;
          <router-link :to="'/address/' + tx.from"> {{ tx.from.slice(0, 19) + '...' }}</router-link> &nbsp;
        </div>
        <div style="margin-top: 1%">
          To &nbsp;
          <router-link :to="'/address/' + tx.to"> {{ tx.to.slice(0, 19) + '...' }}</router-link> &nbsp;
        </div>
        <div style="margin-top: 1%">
          <el-tag type="info">
            {{ ethers.utils.formatUnits((parseInt(tx.gas) * parseInt(tx.gasPrice as any)).toString(), 18) }}
            {{ getUnitDisplay() }}
            <!-- {{ scope.row.gas }} {{getUnitDisplay()}} -->
          </el-tag>
        </div>
      </el-card>
    </div>
  </el-card>
  <div class="center">
    <el-button class="home-bottom-button" type="primary" plain @click="moveToTxs">View all Transactions</el-button>
  </div>
</template>
<script lang="ts" setup>
import { getAge } from '../../script/utils';
import { TransactionDetail } from '../../script/model/transaction';
import { BlockDetail } from '../../script/model/block';
import { ethers } from 'ethers';
import { getUnitDisplay } from '../../script/global';
import { useRouter } from 'vue-router';

const props = defineProps({
  blocksData: {
    type: Array as () => Array<BlockDetail>,
    require: true,
  },
  txsData: {
    type: Array as () => Array<TransactionDetail>,
    require: true,
  },
});

const router = useRouter();
const moveToTxs = () => {
  router.push('/txs/all');
};
const moveToBlocks = () => {
  router.push('/blocks');
};
</script>
<style lang="less" scoped>
@import '../../css/style.css';
.box-card {
  width: 100% !important;
  margin-top: 2%;
}
</style>
