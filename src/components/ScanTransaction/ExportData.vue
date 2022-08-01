<template lang="">
  <div>
    <div style="text-align: center">
      <h3 class="h3-title">Download Data(Transactions)</h3>
      <div style="display: flex; justify-content: center">
        <p style="color: #77838f; width: 50%">
          The information you requested can be downloaded from this page. But before continuing please verify that you
          are not a robot by completing the captcha below.
        </p>
      </div>
      <div style="display: flex; justify-content: center">
        <el-card class="box-card">
          <p>Export the earliest 5000 records starting from</p>
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          />
          <div style="margin-top: 20px">
            <el-button type="primary">Download</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]);
</script>
<style lang="less" scoped>
@import '../../css/style.css';
.box-card {
  width: 50%;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
