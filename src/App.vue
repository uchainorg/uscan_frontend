<template lang="">
  <div class="container-main">
    <scan-header title="Coq Chain Scan"></scan-header>
    <router-view></router-view>
    <scan-tail></scan-tail>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "chain-scan",
});
</script>
<style lang="less" scoped>
.container-main {
  margin: auto;
  max-width: 1400px;
}
</style>
