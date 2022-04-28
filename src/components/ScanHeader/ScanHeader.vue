<template lang="">
  <div class="header-container">
    <div class="header-title-container" :style="{ fontSize: fsize + 'px' }">
      {{ title }}
    </div>
    <div class="header-input-container">
      <el-input
        style="width: 80%"
        v-model.trim="search_data"
        placeholder="请输入搜索的关键字"
      >
      </el-input>
    </div>
    <el-link type="primary" @click="moveToHome">首页</el-link>
  </div>
</template>
<script>
export default {
  name: "ScanHeader",
  props: {
    title: {
      type: String,
      default: "ankr chain scan",
    },
    fsize: {
      type: Number,
      default: 25,
    },
  },
  data() {
    return {
      search_data: "",
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
};
</script>
<style lang="less" scoped>
.header-container {
  //   margin: auto;
  //   margin-top: 80px;
  //   width: 100%;
  //   height: 120px;
  display: flex;
  margin-top: 50px;
  justify-content: center;
}

.header-title-container {
  width: 30%;
}

.header-input-container {
  width: 30%;
}
</style>
