<template lang="">
  <el-table :data="blocksData" empty-text="loading..." style="width: 100%; border-radius: 15px" :row-style="{ height: '50px' }">
    <el-table-column v-for="info in headerData" :key="info.key" :property="info.key" :label="info.label">
      <!-- <template #header>
        <div>hhhhhh</div>
      </template> -->
      <template v-slot:default="scope">
        <div v-if="scope.column.property == 'blockNumber'">
          <router-link :to="'/block/' + parseInt(scope.row[scope.column.property])">
            {{ parseInt(scope.row[scope.column.property]) }}
          </router-link>
        </div>
        <div v-else-if="scope.column.property == 'miner'" style="width: 180px">
          <router-link :to="'/address/' + scope.row.miner"> {{ scope.row.miner.slice(0, 18) + "..." }} </router-link>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "generalBlocks",
  props: {
    blocksData: {
      type: Array,
      require: true,
    },
    headerData: {
      type: Array,
      require: true,
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
