<template lang="">
  <div>
    <el-table :data="txsData" style="width: 100%; border-radius: 0.35rem" :row-style="{ height: '50px' }">
      <template #empty>{{ emptyText }}</template>
      <el-table-column width="37px">
        <template v-slot:default="scope">
          <el-popover placement="right" title="Additional Info" :width="320" trigger="click">
            <template #reference>
              <el-button style="width: 5px" type="info" size="small">
                <el-icon><View /></el-icon>
              </el-button>
            </template>
            <div>
              <h4>Status:</h4>
              <div v-if="scope.row.parameterValue == 1">
                <el-icon color="green"><SuccessFilled /></el-icon> &nbsp; Success
              </div>
              <div v-if="scope.row.parameterValue == 0">
                <el-icon color="red"><Failed /></el-icon> &nbsp; Fail
              </div>
              <div v-if="scope.row.parameterValue == 3">
                <el-icon><VideoPause /></el-icon> &nbsp; Pending
              </div>
              <el-divider />
              <h4>Transaction Fee:</h4>
              {{ this.$wei2eth(parseInt(scope.row.gas)) }} Eth
              <el-divider />
              <h4>Gas Info:</h4>
              {{ scope.row.gas }} Used From {{ scope.row.gas }} GasLimit
              <el-divider />
              <h4>Nonce:</h4>
              {{ scope.row.nonce }}
              <el-divider />

              <router-link class="center-row" :to="'/tx/' + scope.row.hash">
                See more details &nbsp; <el-icon size="large"><Link /></el-icon>
              </router-link>
            </div>
          </el-popover>
        </template>
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
  data() {
    return {
      emptyText: "loading",
    };
  },
  watch: {
    txsData(newVal) {
      // console.log(newVal.length);
      if (newVal.length == 0) {
        this.emptyText = "No data found";
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
