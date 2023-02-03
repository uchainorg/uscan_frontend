<template lang="">
  <div>
    <el-table class="table-border" :data="props.blocksData" empty-text="loading..." :row-style="{ height: '75px' }">
      <el-table-column label="Latest Blocks" width="225">
        <template v-slot:default="scope">
          <el-row>
            <el-col :span="6">
              <div class="list-icon">
                <p>Bk</p>
              </div>
            </el-col>
            <el-col :span="18">
              <div>
                <router-link :to="'/block/' + parseInt(scope.row.number)">{{ parseInt(scope.row.number) }}</router-link>
                <div>{{ getAge(scope.row.timestamp) }}</div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column width="250">
        <template v-slot:default="scope">
          <div>
            Miner
            <router-link :to="'/address/' + scope.row.miner">
              {{ scope.row.miner.slice(0, 15) + '...' }}
            </router-link>
          </div>
          <div style="width: 60px">
            <el-tooltip effect="dark" content="Transactions in this block" placement="right">
              <div v-if="scope.row.transactionsTotal == 0">0 txns</div>
              <div v-else>
                <router-link :to="'/txs/all?block=' + parseInt(scope.row.number)">
                  {{ scope.row.transactionsTotal }} txns
                </router-link>
              </div>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <el-tooltip effect="dark" content="gasUsed" placement="right">
            <div style="text-align: right">
              <el-tag type="info">{{ ethersFormatUnits(scope.row.gasUsed) }}</el-tag>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="center">
      <el-button class="home-bottom-button" type="primary" plain @click="moveToBlocks">View all Blocks</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getAge } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { ethersFormatUnits } from '@/utils/ethersUtils';
import { BlockDetail } from '@/model/block';

const props = defineProps({
  blocksData: {
    type: Array as () => Array<BlockDetail>,
    require: true,
  },
});

const router = useRouter();
const moveToBlocks = () => {
  router.push('/blocks');
};
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
