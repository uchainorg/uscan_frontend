<template lang="">
  <el-table :data="txsData" empty-text="loading...">
    <el-table-column label="Txn Hash" width="190">
      <template v-slot:default="scope">
        <div>{{ scope.row.hash.slice(0, 18) + "..." }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Method" width="130">
      <template v-slot:default="scope">
        <div>{{ scope.row.method }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Block" width="130">
      <template v-slot:default="scope">
        <div>
          <router-link :to="'/block/' + parseInt(scope.row.blockNumber)">{{ parseInt(scope.row.blockNumber) }}</router-link>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Age" width="130">
      <template v-slot:default="scope">
        <el-tooltip class="box-item" effect="dark" placement="top">
          <template #content> {{ scope.row.ageFormat }} </template>
          <div>{{ scope.row.age }}</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="From" width="190">
      <template v-slot:default="scope">
        <div>{{ scope.row.from.slice(0, 19) + "..." }}</div>
      </template>
    </el-table-column>
    <el-table-column label="To" width="190">
      <template v-slot:default="scope">
        <div>{{ scope.row.to.slice(0, 19) + "..." }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Value">
      <template v-slot:default="scope">
        <div>{{ parseInt(scope.row.value) }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Txn Fee">
      <template v-slot:default="scope">
        <div>{{ parseInt(scope.row.gas) }}</div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "generalTxs",
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
