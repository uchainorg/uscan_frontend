<template lang="">
  <div class="copy-content">
    <el-tooltip placement="right" :visible="visible">
      <template #content>{{ copyTip }} </template>
      <el-button
        type="info"
        class="copy-icon"
        @click="copyContent"
        @mouseenter="visible = true"
        @mouseleave="
          visible = false;
          leave();
        "
      >
        <el-icon><Link /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import useClipboard from 'vue-clipboard3';
import { Link } from '@element-plus/icons-vue';

const props = defineProps({
  text: String,
});

const copyTip = ref('Copy to clipboard');
const visible = ref(false);
const { toClipboard } = useClipboard();
const copyContent = async () => {
  copyTip.value = 'Copy Success';
  try {
    await toClipboard(props.text as string);
  } catch (e) {
    console.error(e);
  }
};
const leave = () => {
  copyTip.value = 'Generate Permalink';
};
</script>
<style lang="less" scoped>
.copy-content {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.copy-icon {
  color: white;
  cursor: pointer;
}
</style>
