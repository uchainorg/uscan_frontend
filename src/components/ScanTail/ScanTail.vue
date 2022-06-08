<template lang="">
  <!-- <div class="tail-container">Let's do something interesting.End!</div> -->
  <div class="footer-container">
    <!-- <img src="../../assets/logo.png" width="35" height="35" />
    &nbsp;&nbsp;
    <h2 style="color: white">Let's do something interesting.End!</h2> -->

    <div class="item" style="width: 600px">
      <div style="width: 340px">
        <p style="font-size: 20px; color: white">Powered by Ankr</p>
        <p style="font-size: 13px; color: white">Coqscan is a Block Explorer and Analytics Platform for Coq, a decentralized smart contracts platform.</p>
      </div>
    </div>
    <div class="item">
      <div style="width: 200px">
        <p style="font-size: 14px; color: white">Company</p>
        <el-divider border-style="dotted" />
        <div class="item-content">
          <p>About Us</p>
          <p>About Us</p>
          <p>About Us</p>
          <p>About Us</p>
        </div>
      </div>
    </div>
    <div class="item">
      <div style="width: 200px">
        <p style="font-size: 14px; color: white">Resources</p>
        <el-divider border-style="dotted" />
        <div class="item-content">
          <p>About Us</p>
          <p>About Us</p>
          <p>About Us</p>
          <p>About Us</p>
        </div>
      </div>
    </div>
    <div class="item">
      <div style="width: 200px">
        <p style="font-size: 14px; color: white">Products & Services</p>
        <el-divider border-style="dotted" />
        <div class="item-content">
          <p>About Us</p>
          <p>About Us</p>
          <p>About Us</p>
          <p>About Us</p>
        </div>
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
.footer-container {
  margin-top: 13px;
  display: flex;
  flex-direction: row;
}
.item {
  width: 50px;
  // background-color: red;
  margin: 5px;
  width: 250px;
  height: 200px;
}

.item-content {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.item-content > p {
  margin-top: 1px;
  font-size: 14px;
  color: #b3b6c4;
}
</style>
