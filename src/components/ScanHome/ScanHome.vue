<template lang="">
  <div>
    <el-row :gutter="20">
      <el-col :span="12"
        ><Suspense><scan-home-blocks></scan-home-blocks></Suspense
      ></el-col>
      <el-col :span="12"><scan-home-blocks></scan-home-blocks></el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
// import { ref } from 'vue';
// const input = ref('Home');
</script>
<style lang="less" scoped></style>
