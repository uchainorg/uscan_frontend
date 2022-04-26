<template lang="">
  <div class="block-container">
    <el-table :data="tableData" style="width: 90%">
      <el-table-column
        prop="transactionHash"
        label="Latest Transactions"
        width="180"
      />
      <el-table-column prop="fromAndToAddress" width="180" />
      <el-table-column>
        <template v-slot:default="scope">
          <div style="text-align: right">
            {{ scope.row.amount }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "ScanTransaction",
  data() {
    return {
      tableData: [
        {
          transactionHash: "0xe17122e...",
          fromAndToAddress: "0xe17122e...",
          amount: "1.2 Eth",
        },
        {
          transactionHash: "0xe17122e...",
          fromAndToAddress: "0xe17122e...",
          amount: "1.2 Eth",
        },
        {
          transactionHash: "0xe17122e...",
          fromAndToAddress: "0xe17122e...",
          amount: "1.2 Eth",
        },
        {
          transactionHash: "0xe17122e...",
          fromAndToAddress: "0xe17122e...",
          amount: "1.2 Eth",
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.block-container {
  width: 40%;
}
</style>
