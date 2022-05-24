<template lang="">
  <div>
    <div v-for="(log, index) in this.data.logs" :key="index">
      <h4>Address :</h4>
      {{ log.address }}
      <h4>topics:</h4>
      {{ log.topics }}
      <h4>Data:</h4>
      {{ log.data }}
      <el-divider />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TransactionLogs",
  props: ["data"],
});
</script>
<style lang=""></style>
