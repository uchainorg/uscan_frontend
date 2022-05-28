<template lang="">
  <!-- <div class="tail-container">Let's do something interesting.End!</div> -->
  <div class="footer-container">
    <el-icon color="#253258" :size="33"><Bowl /></el-icon>
    <h2>Let's do something interesting.End!</h2>
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
