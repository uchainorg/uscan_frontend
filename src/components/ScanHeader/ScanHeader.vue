<template lang="">
  <div class="header-container">
    <div class="header-title-container" :style="{ fontSize: fsize + 'px' }">
      {{ title }}
    </div>
    <br />
    <div class="header-input-container">
      <el-input
        style="width: 80%"
        v-model.trim="search_data"
        placeholder="请输入搜索的关键字"
      >
      </el-input>
    </div>
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
};
</script>
<style lang="less" scoped>
.header-container {
  margin: auto;
  margin-top: 80px;
  width: 100%;
  height: 120px;
}

.header-title-container {
  float: left;
  margin-left: 30%;
}

.header-input-container {
  float: left;
  width: 40%;
  margin-left: 30%;
  margin-top: 1%;
}
</style>
