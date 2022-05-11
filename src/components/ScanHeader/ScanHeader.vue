<template lang="">
  <div class="header-container">
    <div class="header-title-container" :style="{ fontSize: fsize + 'px' }">
      {{ title }}
    </div>
    <div class="header-input-container">
      <el-link style="align-self: flex-start; margin-bottom: 4%" type="primary" @click="moveToHome">Home</el-link>
      <el-input style="width: 100%" v-model.trim="search_data" placeholder="Search by Address / Txhash / Block / Token / Ens"> </el-input>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScanHeader",
  props: {
    title: {
      type: String,
      default: "ankr chain scan",
    },
    fsize: {
      type: Number,
      default: 35,
    },
  },
  data() {
    return {
      search_data: "",
      lastBlockNumber: 0,
    };
  },
  watch: {
    search_data(newVal) {
      console.log(newVal);
    },
  },
  methods: {
    moveToHome() {
      this.$router.push("/");
    },
  },
});
</script>
<style lang="less" scoped>
.header-container {
  display: flex;
  margin-top: 50px;
  justify-content: center;
}

.header-title-container {
  width: 30%;
  font-family: "Gill Sans", Times, serif;
  margin-top: 2%;
}

.header-input-container {
  width: 30%;
  display: flex;
  flex-direction: column;
}
</style>
