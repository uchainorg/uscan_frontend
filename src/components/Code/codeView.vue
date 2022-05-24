<template lang="">
  <div>
    <codemirror
      v-model="code"
      placeholder="Code gose here..."
      :style="{ height: '300px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tabSize="2"
      :extensions="extensions"
    />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
export default defineComponent({
  name: "codeView",
  props: ["codeData"],
  components: { Codemirror },
  data() {
    return {
      code: this.codeData,
      extensions: [javascript(), oneDark],
    };
  },
});
</script>
<style lang=""></style>
