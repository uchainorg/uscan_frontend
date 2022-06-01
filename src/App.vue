<template lang="">
  <div class="index">
    <el-container>
      <div :class="this.$store.state.headerName == 'scan-header' ? 'header-home' : 'header-info'">
        <el-header>
          <!-- <scan-header title="Coq Chain Scan"></scan-header> -->
          <component :is="this.$store.state.headerName"></component>
        </el-header>
      </div>

      <el-main>
        <router-view style="width: 1350px; margin: 0 auto; margin-top: 2%"></router-view>
      </el-main>
      <div style="background-color: #263258; margin-top: 5%">
        <el-footer>
          <scan-tail></scan-tail>
        </el-footer>
      </div>
    </el-container>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import ScanHeader from "./components/ScanHeader/ScanHeader.vue";
import ScanHeaderInfo from "./components/ScanHeader/ScanHeaderInfo.vue";
export default defineComponent({
  name: "chain-scan",
  data() {
    return {
      comName: "scan-header-info",
    };
  },
  components: {
    ScanHeader,
    ScanHeaderInfo,
  },
});
</script>
<style lang="less" scoped>
.header-home {
  background-color: #263258;
  height: 240px;
}

.header-info {
  background-color: white;
  height: 110px;
}

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
  background-color: transparent;
  width: 1350px;
  height: 100%;
  // margin: 0 auto;
  display: flex;
  align-items: center;
}
.el-main {
  height: 100%;
  width: 100%;
  margin-top: 5px;
}
.el-footer {
  display: flex;
  height: 240px;
  width: 1350px;
  align-items: center;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>
