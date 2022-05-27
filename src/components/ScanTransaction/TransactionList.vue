<template lang="">
  <div class="container">
    <h3>Transactions For Block {{ number }}</h3>
    <general-txs :txsData="tableDate" :headerData="headerList"></general-txs>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetTxsByBlock } from "../../js/request.js";
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
      let res = await GetTxsByBlock(this.$rpc_http, this.number);
      this.tableDate = res;
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
