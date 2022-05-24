<template lang="">
  <div>BlockComments {{ data.blockNumber }}</div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "BlockComments",
  props: ["data"],
});
</script>
<style lang=""></style>
