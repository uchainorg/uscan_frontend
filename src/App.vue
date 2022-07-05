<template>
  <div class="index">
    <el-container>
      <el-header> el-header </el-header>
      <el-main>
        <Suspense><router-view class="content"></router-view></Suspense>
      </el-main>
      <el-footer> el-footer </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
.content {
  max-width: 1350px;
  margin: 0 auto;
}
</style>
