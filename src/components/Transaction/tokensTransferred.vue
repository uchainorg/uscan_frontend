<template lang="">
  <div :class="isRolling ? 'rolling' : ''">
    <div v-for="(trans, index) in this.tokensTransferData" :key="index">
      <div class="center-row">
        <div style="font-weight: bold">From</div>
        &nbsp;&nbsp;&nbsp;
        <router-link :to="'/address/' + trans.from">{{ trans.from.slice(0, 18) + "..." }}</router-link>
        &nbsp;&nbsp;&nbsp;
        <div style="font-weight: bold">To</div>
        &nbsp;&nbsp;&nbsp;
        <router-link :to="'/address/' + trans.to">{{ trans.to.slice(0, 18) + "..." }}</router-link>
        &nbsp;&nbsp;&nbsp;
        <router-link :to="'/address/' + trans.address">
          <div v-if="trans.addressName.length != 0">{{ trans.addressName }}</div>
          <div v-else>
            {{ trans.address.slice(0, 18) + "..." }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TokensTrans",
  props: {
    tokensTransferData: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isRolling: false,
    };
  },
  created() {
    if (this.tokensTransferData.length >= 3) {
      this.isRolling = true;
    }
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
.rolling {
  height: 100px;
  overflow: auto;
}
</style>
