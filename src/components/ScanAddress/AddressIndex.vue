<template lang="">
  <div>
    <div v-if="addressInfo.code === '' || addressInfo.code === null || addressInfo.code === 'ERR_BAD_RESPONSE'">
      <account-address :address="address" :addressInfo="addressInfo" :resCode="resCode"> </account-address>
    </div>
    <div v-else>
      <contract-address :address="address" :addressInfo="addressInfo"> </contract-address>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { GetAddressInfo } from '../../script/service/addressService';
import { ref, watch, onMounted } from 'vue';
import AccountAddress from './AccountAddress.vue';
import ContractAddress from './ContractAddress.vue';
import { AddressDetail } from '../../script/model/address';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  address: String,
});
const addressInfo = ref({ code: '', balance: '0x0' } as AddressDetail);
const resCode = ref(0);

onMounted(async () => {
  const addressRes = await GetAddressInfo(props.address as string);
  addressInfo.value = addressRes.data;
  resCode.value = addressRes.code;
  // console.log('Code', addressInfo);
});

watch(props, async () => {
  router.go(0);
  const addressRes = await GetAddressInfo(props.address as string);
  addressInfo.value = addressRes.data;
});
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
