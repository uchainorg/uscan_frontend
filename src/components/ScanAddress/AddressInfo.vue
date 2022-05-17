<template lang="">
  <div class="container">
    <!-- <div>This is a contract address page, address is {{ address }}</div> -->
    <component :is="comName" :address="address"></component>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import contractAddress from "./contractAddress.vue";
import accountAddress from "./accountAddress.vue";

export default defineComponent({
  name: "AddressInfo",
  props: ["address"],
  components: { contractAddress, accountAddress },
  data() {
    return {
      comName: "contractAddress",
    };
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
