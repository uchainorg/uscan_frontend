<template lang="">
  <div class="code-content">
    <codemirror
      v-model="code"
      placeholder="Code here..."
      :style="{ height: height }"
      :autofocus="true"
      :disabled="true"
      :indent-with-tab="true"
      :tabSize="2"
      :extensions="extensions"
    />
  </div>
</template>
<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { watchEffect, ref } from 'vue';

const props = defineProps({
  codeData: String,
  isFull: Boolean,
});
// eslint-disable-next-line vue/no-setup-props-destructure
const code = props.codeData;
const extensions = [javascript()];

const height = ref('');

watchEffect(() => {
  console.log('watch code view', props.isFull);
  if (props.isFull) {
    height.value = 'auto';
  } else {
    height.value = '300px';
  }
});
</script>
<style lang="less" scoped>
.code-content {
  font-size: 13px;
  border: 1px solid #e7eaf3;
  border-radius: 0.35rem;
}
</style>
