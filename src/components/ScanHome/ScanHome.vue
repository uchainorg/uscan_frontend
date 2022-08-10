<template lang="">
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <Suspense>
          <scan-home-blocks></scan-home-blocks>
        </Suspense>
      </el-col>
      <el-col :span="12">
        <Suspense>
          <scan-home-transactions></scan-home-transactions>
        </Suspense>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { getTitle } from '../../script/utils';
document.title = 'Home | The ' + getTitle + ' Explorer';
</script>
<style></style>
