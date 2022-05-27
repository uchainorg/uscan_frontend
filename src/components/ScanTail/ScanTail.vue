<template lang="">
  <!-- <div class="tail-container">Let's do something interesting.End!</div> -->
  <div style="background-color: white; margin-top: 3%">
    <div style="width: 1350px; height: 140px; margin: 0 auto; display: flex; justify-content: center; align-items: center">
      <div class="center-row">
        <el-icon color="#253258" :size="33"><Bowl /></el-icon>
        &nbsp;
        <h2>Let's do something interesting.End!</h2>
      </div>
    </div>
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
</style>
