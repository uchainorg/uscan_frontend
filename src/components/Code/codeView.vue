<template lang="">
  <div class="code-content">
    <codemirror v-model="code" placeholder="Code gose here..." :style="{ height: '300px' }" :autofocus="true" :indent-with-tab="true" :tabSize="2" :extensions="extensions" />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
// import { oneDark } from "@codemirror/theme-one-dark";
export default defineComponent({
  name: "codeView",
  props: ["codeData"],
  components: { Codemirror },
  data() {
    return {
      code: this.codeData,
      extensions: [javascript()],
    };
  },
  watch: {
    codeData(newVal) {
      this.code = newVal;
    },
  },
});
</script>
<style lang="less" scoped>
.code-content {
  font-size: 13px;
  border: 1px solid #e7eaf3;
  border-radius: 0.35rem;
}
</style>
