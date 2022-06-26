<template lang="">
  <div>{{ contractABICode }}</div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "readContract",
  props: {
    contractABICode: {
      type: String,
      require: true,
    },
  },
  // data() {
  //   return {
  //     contractABICodeContent: "",
  //   };
  // },
  // updated() {
  //   this.contractABICodeContent = this.contractABICode;
  // },
});
</script>
<style lang=""></style>
