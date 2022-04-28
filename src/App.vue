<template lang="">
  <div class="container">
    <scan-header title="Coq Chain Scan"></scan-header>
    <br />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "ankr chain scan",
};
</script>
<style lang="less" scoped>
.container {
  margin: auto;
  max-width: 1400px;
}
</style>
