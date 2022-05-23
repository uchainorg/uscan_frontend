<template lang="">
  <div>
    <div>
      <textarea rows="30" cols="165" v-model="codeContent"> </textarea>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "contractInfo",
  props: ["contractAddress", "code"],
  data() {
    return {
      codeContent: "",
    };
  },
  updated() {
    this.codeContent = this.code;
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
