<template lang="">
  <div class="container">
    <h3>Blocks</h3>
    <general-blocks :blocksData="tableDate" :headerData="headerList"></general-blocks>
    <div style="margin-top: 1%; display: flex; justify-content: center">
      <el-pagination
        :currentPage="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 25, 50, 100]"
        :pager-count="5"
        :small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import generalBlocks from "../Block/generalBlocks.vue";
import { GetBlockList } from "../../js/request";
export default defineComponent({
  name: "BlocksList",
  components: { generalBlocks },
  data() {
    return {
      tableDate: [],
      currentPage: 1,
      pageSize: 25,
      small: true,
      total: 0,
      headerList: [
        {
          label: "Block",
          key: "blockNumber",
        },
        {
          label: "Age",
          key: "age",
        },
        {
          label: "Txn",
          key: "txn",
        },
        {
          label: "Miner",
          key: "miner",
        },
        {
          label: "Gas Used",
          key: "gasUsed",
        },
        {
          label: "Gas Limit",
          key: "gasLimit",
        },
        {
          label: "Base Fee",
          key: "baseFee",
        },
      ],
    };
  },
  created() {
    this.getBlocksList();
  },
  methods: {
    async getBlocksList() {
      let res = await GetBlockList(this.$rpc_http, this.currentPage - 1, this.pageSize);
      this.tableDate = res.resList;
      this.total = res.total;
    },
    async handleCurrentChange(val) {
      // console.log(`current page: ${val}`);
      this.tableDate = [];
      this.currentPage = val;
      let res = await GetBlockList(this.$rpc_http, this.currentPage - 1, this.pageSize);
      this.tableDate = res.resList;
      this.total = res.total;
    },
    async handleSizeChange(val) {
      // console.log(`${val} items per page`);
      this.tableDate = [];
      this.currentPage = 1;
      this.pageSize = val;
      let res = await GetBlockList(this.$rpc_http, this.currentPage - 1, this.pageSize);
      this.tableDate = res.resList;
      this.total = res.total;
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
