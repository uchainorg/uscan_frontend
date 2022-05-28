<template lang="">
  <div class="index">
    <el-container>
      <div style="background-color: white">
        <el-header>
          <scan-header title="Coq Chain Scan"></scan-header>
        </el-header>
      </div>

      <el-main>
        <router-view style="width: 1350px; margin: 0 auto; margin-top: 2%"></router-view>
      </el-main>
      <div style="background-color: white">
        <el-footer>
          <scan-tail></scan-tail>
        </el-footer>
      </div>
    </el-container>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "chain-scan",
});
</script>
<style lang="less" scoped>
.index {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-header {
  background-color: white;
  width: 1350px;
  height: 150px;
  margin: 0 auto;
}
.el-main {
  height: 100%;
  width: 100%;
  margin-top: 5px;
}
.el-footer {
  display: flex;
  height: 150px;
  width: 1350px;
  align-items: center;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>
