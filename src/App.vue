<template lang="">
  <div>
    <scan-header title="Coq Chain Scan"></scan-header>
    <router-view style="width: 1350px; margin: 0 auto; margin-top: 2%"></router-view>
    <scan-tail></scan-tail>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "chain-scan",
});
</script>
<style lang="less" scoped></style>
