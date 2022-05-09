<template lang="">
  <div class="container">
    <scan-header title="Coq Chain Scan"></scan-header>
    <router-view></router-view>
    <scan-tail></scan-tail>
  </div>
</template>
<script>
export default {
  name: "chain-scan",
};
</script>
<style lang="less" scoped>
.container {
  margin: auto;
  max-width: 1400px;
}
</style>
