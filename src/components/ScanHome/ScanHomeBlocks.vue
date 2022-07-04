<template lang="">
  <div>
    {{ res.data }}
  </div>
</template>
<script lang="ts" setup>
import { GetBlocks } from '../../script/service/blockService';

console.log('created');
const res = await GetBlocks();
console.log('scan-home-blocks', res);
</script>
<style lang=""></style>
