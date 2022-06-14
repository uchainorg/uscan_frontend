<template lang="">
  <div>
    <el-table style="border-radius: 0.35rem" :data="this.$store.state.HomeBlockInfoList" empty-text="loading..." :row-style="{ height: '75px' }">
      <el-table-column label="Latest Blocks" width="250">
        <template v-slot:default="scope">
          <el-row>
            <el-col :span="6">
              <div class="list-icon">
                <p style="font-size: 15px; font-weight: bold">Bk</p>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="table-column-row">
                <router-link :to="'/block/' + scope.row.blockNumber">{{ scope.row.blockNumber }}</router-link>
                <div>{{ scope.row.age }}</div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <div class="table-column-row">
            <div>
              Miner <router-link :to="'/address/' + scope.row.miner"> {{ scope.row.miner.slice(0, 15) + "..." }} </router-link>
            </div>
            <el-tooltip class="box-item" effect="dark" content="Transactions in this block" placement="right">
              <div style="width: 60px">
                <div v-if="scope.row.txn == 0">0 txns</div>
                <div v-else>
                  <router-link :to="'/block/txs/' + scope.row.blockNumber">{{ scope.row.txn }} txns</router-link>
                </div>
              </div>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <el-tooltip class="box-item" effect="dark" content="gasUsed" placement="right">
            <div style="text-align: right">
              <el-tag type="info">{{ this.$wei2eth(scope.row.gasUsed) }} Eth</el-tag>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center">
      <el-button type="primary" plain style="width: 95%; margin-top: 1%; border: 0" @click="moveToBlocks">View all Blocks</el-button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScanBlock",
  methods: {
    moveToBlocks() {
      this.$router.push("/blocks");
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
