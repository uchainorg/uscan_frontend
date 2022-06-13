<template lang="">
  <div style="-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none">
    <el-tooltip placement="right" v-model:visible="visible">
      <template #content>{{ this.copyTip }} </template>
      <el-icon
        class="copy-icon"
        @click="copyAddressHash"
        @mouseenter="visible = true"
        @mouseleave="
          visible = false;
          leave();
        "
        ><DocumentCopy
      /></el-icon>
    </el-tooltip>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import useClipboard from "vue-clipboard3";
export default defineComponent({
  name: "CopyIcon",
  props: ["text"],
  data() {
    return {
      copyTip: "Copy to clipboard",
      visible: false,
      toClipboard: useClipboard(),
    };
  },
  methods: {
    async copyAddressHash() {
      let text = this.text;
      let { toClipboard } = useClipboard();
      this.copyTip = "Copy Success";
      // console.log(text);
      try {
        await toClipboard(text);
        // console.log("Copied to clipboard");
      } catch (e) {
        console.error(e);
      }
    },
    leave() {
      this.copyTip = "Copy to clipboard";
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
</style>
