<template lang="">
  <div>TransactionComments {{ this.data.txHash }}</div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TransactionComments",
  props: ["data"],
});
</script>
<style lang=""></style>
