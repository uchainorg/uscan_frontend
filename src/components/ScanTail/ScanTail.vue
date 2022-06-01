<template lang="">
  <!-- <div class="tail-container">Let's do something interesting.End!</div> -->
  <div class="footer-container">
    <img src="../../assets/logo.png" width="35" height="35" />
    &nbsp;&nbsp;
    <h2 style="color: white">Let's do something interesting.End!</h2>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScanTail",
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
