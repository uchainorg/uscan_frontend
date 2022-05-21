<template lang="">
  <div class="container">
    <h3 style="display: inline">Transactions</h3>
    <div>For Block {{ number }}</div>
    <general-txs :txsData="tableDate" :headerData="headerList"></general-txs>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { getBlock } from "../../js/block.js";
import { diffTime } from "../../js/utils.js";
import generalTxs from "../Transaction/generalTxs.vue";
export default defineComponent({
  name: "TransactionList",
  props: ["number"],
  components: { generalTxs },
  data() {
    return {
      tableDate: [],
      headerList: [
        {
          label: "Txn Hash",
          key: "hash",
        },
        {
          label: "Method",
          key: "method",
        },
        {
          label: "Block",
          key: "blockNumber",
        },
        {
          label: "Age",
          key: "age",
        },
        {
          label: "From",
          key: "from",
        },
        {
          label: "To",
          key: "to",
        },
        {
          label: "Value",
          key: "value",
        },
        {
          label: "Txn Fee",
          key: "gas",
        },
      ],
    };
  },
  created() {
    this.getTransactionList();
  },
  methods: {
    async getTransactionList() {
      let res = await getBlock(this.$rpc_http, this.number);
      res.transactions.slice(0, 50).forEach((tx) => {
        (tx.method = "test-method"),
          (tx.age = diffTime(new Date(parseInt(res.timestamp)) * 1000, new Date())),
          (tx.ageFormat = new Date(parseInt(res.timestamp) * 1000).toUTCString());
        this.tableDate.push(tx);
      });
      // console.log(this.tableDate);
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
