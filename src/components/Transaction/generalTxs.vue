<template lang="">
  <div>
    <el-table :data="txsData" empty-text="loading..." style="width: 100%; border-radius: 0.35rem" :row-style="{ height: '50px' }">
      <el-table-column width="37px">
        <template v-slot:default="scope">
          <el-button style="width: 5px" type="info" size="small">
            <el-icon @click="moveToTx(scope.row.hash)"><View /></el-icon>
          </el-button>
        </template>
        <!-- <el-button style="width: 5px" type="info" size="small">
          <el-icon @click="moveToTx"><View /></el-icon>
        </el-button> -->
      </el-table-column>
      <el-table-column v-for="info in headerData" :key="info.key" :property="info.key" :label="info.label">
        <template v-slot:default="scope">
          <div v-if="scope.column.property == 'hash'" style="width: 170px">
            <router-link :to="'/tx/' + scope.row[scope.column.property]">{{ scope.row[scope.column.property].slice(0, 15) + "..." }}</router-link>
          </div>
          <div v-else-if="scope.column.property == 'blockNumber'">
            <router-link :to="'/block/' + parseInt(scope.row[scope.column.property])">{{ parseInt(scope.row[scope.column.property]) }}</router-link>
          </div>
          <div v-if="scope.column.property == 'age'">
            {{ scope.row[scope.column.property].slice(0, 15) }}
          </div>
          <div v-else-if="scope.column.property == 'from'" style="width: 170px">
            <div v-if="scope.row[scope.column.property] != ''">
              <router-link :to="'/address/' + scope.row[scope.column.property]">{{ scope.row[scope.column.property].slice(0, 15) + "..." }}</router-link>
            </div>
          </div>
          <div v-else-if="scope.column.property == 'to'" style="width: 170px">
            <div v-if="scope.row[scope.column.property] != ''">
              <router-link :to="'/address/' + scope.row[scope.column.property]">{{ scope.row[scope.column.property].slice(0, 15) + "..." }}</router-link>
            </div>
          </div>
          <div v-else-if="scope.column.property == 'value'">{{ this.$wei2eth(scope.row[scope.column.property]) }} Ether</div>
          <div v-else-if="scope.column.property == 'valueToken'">{{ this.$wei2eth(parseInt(scope.row[scope.column.property])) }}</div>
          <div v-else-if="scope.column.property == 'gas'" style="width: 170px; font-size: 11px">{{ this.$wei2eth(parseInt(scope.row[scope.column.property])) }}</div>
          <div v-else-if="scope.column.property == 'token'" style="width: 170px; font-size: 11px">
            <div v-if="scope.row[scope.column.property]">
              <router-link :to="'/token/' + scope.row[scope.column.property]">{{ scope.row[scope.column.property].slice(0, 15) + "..." }}</router-link>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
  watch: {
    txsData(newVal) {
      // console.log(newVal.length);
      if (newVal.length == 0) {
        this.$router.push("/notFound");
      }
    },
  },
  methods: {
    moveToTx(txHash) {
      // console.log(txHash);
      this.$router.push("/tx/" + txHash);
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
