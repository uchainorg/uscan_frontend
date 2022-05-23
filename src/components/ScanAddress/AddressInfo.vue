<template lang="">
  <div class="container">
    <!-- <div>This is a contract address page, address is {{ address }}</div> -->
    <component :is="comName" :address="address" :info="addressInfo"></component>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import contractAddress from "./contractAddress.vue";
import accountAddress from "./accountAddress.vue";
import { GetAddressInfo } from "../../js/request.js";

export default defineComponent({
  name: "AddressInfo",
  props: ["address"],
  components: { contractAddress, accountAddress },
  data() {
    return {
      comName: "contractAddress",
      addressInfo: {},
    };
  },
  created() {
    this.getAccountInfo(this.address);
  },
  methods: {
    async getAccountInfo(address) {
      let res = await GetAddressInfo(this.$rpc_http, address);
      if (res.code) {
        this.comName = "contractAddress";
      } else {
        this.comName = "accountAddress";
      }
      // console.log("getAccountInfo", res);
      this.addressInfo = res;
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
