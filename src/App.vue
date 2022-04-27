<template lang="">
  <div class="container">
    <scan-header title="Ankr Chain Scan"></scan-header>
    <br />
    <scan-home></scan-home>
  </div>
</template>
<script>
import ScanHeader from "./components/ScanHeader/ScanHeader.vue";
import ScanHome from "./components/ScanHome/ScanHome.vue";

export default {
  name: "ankr chain scan",
  components: {
    ScanHeader,
    ScanHome,
  },
};
</script>
<style lang="less" scoped>
.container {
  margin: auto;
  max-width: 1400px;
}
</style>
