<template lang="">
  <el-table :data="txsData" empty-text="loading...">
    <el-table-column label="Parent Txn Hash">
      <template v-slot:default="scope">
        <!-- <div>{{ scope.row.hash.slice(0, 18) + "..." }}</div> -->
        <div>
          <router-link :to="'/tx/' + scope.row.hash">{{ scope.row.hash.slice(0, 18) + "..." }}</router-link>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Block">
      <template v-slot:default="scope">
        <div>
          <router-link :to="'/block/' + parseInt(scope.row.blockNumber)">{{ parseInt(scope.row.blockNumber) }}</router-link>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Age">
      <template v-slot:default="scope">
        <el-tooltip class="box-item" effect="dark" placement="top">
          <template #content> {{ scope.row.ageFormat }} </template>
          <div>{{ scope.row.age }}</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="From">
      <template v-slot:default="scope">
        <div>{{ scope.row.from.slice(0, 19) + "..." }}</div>
      </template>
    </el-table-column>
    <el-table-column label="To">
      <template v-slot:default="scope">
        <div>{{ scope.row.to.slice(0, 19) + "..." }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Value">
      <template v-slot:default="scope">
        <div>{{ parseInt(scope.row.value) }}</div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "internalTxs",
  props: {
    txsData: {
      type: Array,
      require: true,
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
