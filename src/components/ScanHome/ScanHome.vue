<template lang="">
  <div class="container-display">
    <scan-block></scan-block>
    <scan-transaction></scan-transaction>
  </div>
</template>
<script>
import ScanBlock from "../ScanBlock/ScanBlock.vue";
import ScanTransaction from "../ScanTransaction/ScanTransaction.vue";
export default {
  name: "ScanHome",
  components: {
    ScanBlock,
    ScanTransaction,
  },
};
</script>
<style lang="less" scoped>
.container-display {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}
</style>
