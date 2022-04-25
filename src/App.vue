<template lang="">
  <div class="container">
    <scan-header title="Ankr Chain Scan"></scan-header>
    <br />
    <scan-block></scan-block>
    <scan-transaction></scan-transaction>
  </div>
</template>
<script>
import ScanHeader from "./components/ScanHeader/ScanHeader.vue";
import ScanBlock from "./components/ScanBlock/ScanBlock.vue";
import ScanTransaction from "./components/ScanTransaction/ScanTransaction.vue";
export default {
  name: "ankr chain scan",
  components: {
    ScanHeader,
    ScanBlock,
    ScanTransaction,
  },
};
</script>
<style lang="less" scoped>
.container {
  margin: auto;
  max-width: 1400px;
}
</style>
