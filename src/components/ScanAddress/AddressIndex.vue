<template lang="">
  <div>
    <component
      :is="addressInfo.code === '' || addressInfo.code === null ? AccountAddress : ContractAddress"
      :address="address"
      :addressInfo="addressInfo"
    ></component>
  </div>
</template>
<script lang="ts" setup>
import { GetAddressInfo } from '../../script/service/addressService';
import { watchEffect, ref } from 'vue';
import AccountAddress from './AccountAddress.vue';
import ContractAddress from './ContractAddress.vue';
import { AddressDetail } from '../../script/model/address';

const props = defineProps({
  address: String,
});
const addressInfo = ref({ code: '', balance: '0x0' } as AddressDetail);

watchEffect(async () => {
  const addressRes = await GetAddressInfo(props.address as string);
  addressInfo.value = addressRes.data;
});
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
