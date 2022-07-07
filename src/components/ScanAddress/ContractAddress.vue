<template lang="">
  <div>contract detail {{ props.address }}</div>
</template>
<script lang="ts" setup>
import { watchEffect } from 'vue';
import { AddressDetail } from '../../script/model/address';

const props = defineProps({
  address: String,
  addressInfo: {
    type: Object as () => AddressDetail,
  },
});

watchEffect(() => {
  console.log('contract detail', props.addressInfo);
});
</script>
<style lang=""></style>
