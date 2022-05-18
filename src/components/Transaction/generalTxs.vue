<template lang="">
  <el-table :data="txsData" empty-text="loading...">
    <el-table-column v-for="info in headerData" :key="info.key" :property="info.key" :label="info.label">
      <!-- <template #header>
        <div>hhhhhh</div>
      </template> -->
      <template v-slot:default="scope">
        <div v-if="scope.column.property == 'hash'" style="width: 180px">
          <router-link :to="'/tx/' + scope.row[scope.column.property]">{{ scope.row[scope.column.property].slice(0, 18) + "..." }}</router-link>
        </div>
        <div v-else-if="scope.column.property == 'blockNumber'">
          <router-link :to="'/block/' + parseInt(scope.row[scope.column.property])">{{ parseInt(scope.row[scope.column.property]) }}</router-link>
        </div>
        <div v-else-if="scope.column.property == 'from'" style="width: 180px">
          <router-link :to="'/tx/' + scope.row[scope.column.property]">{{ scope.row[scope.column.property].slice(0, 18) + "..." }}</router-link>
        </div>
        <div v-else-if="scope.column.property == 'to'" style="width: 180px">
          <router-link :to="'/tx/' + scope.row[scope.column.property]">{{ scope.row[scope.column.property].slice(0, 18) + "..." }}</router-link>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "generalTxs",
  props: {
    txsData: {
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
