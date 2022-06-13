<template lang="">
  <div style="display: flex; justify-content: center; text-align: center; height: 360px">
    <div>
      <h1 style="color: #3498db">Not Found</h1>
      <el-button type="primary" size="large" @click="moveToHome">Back Home</el-button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "NotFound",
  beforeCreate() {
    document.title = "Not Found | The Coq Explorer";
  },
  methods: {
    moveToHome() {
      this.$router.push("/");
    },
  },
});
</script>
<style lang=""></style>
