<template lang="">
  <div>
    <div v-for="(log, index) in this.data.logs" :key="index">
      <div style="margin-top: 2%">
        <el-card class="box-card-log" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Log Index {{ index }}</span>
            </div>
          </template>
          <div class="card-content">
            <el-row>
              <el-col :span="4">Address:</el-col>
              <!-- <el-col :span="20">{{ log.address }}</el-col> -->
              <el-col :span="20">
                <router-link :to="'/address/' + log.address">{{ log.address }}</router-link>
              </el-col>
            </el-row>
            &nbsp;
            <div v-for="(topic, index) in log.topics" :key="index">
              <el-row>
                <el-col :span="4">Topic {{ index }}:</el-col>
                <el-col :span="20">{{ topic }}</el-col>
              </el-row>
            </div>
            &nbsp;
            <el-row>
              <el-col :span="4">Data:</el-col>
              <el-col :span="20" style="word-break: break-all">
                <div>{{ log.data }}</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
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
<style lang="less" scoped>
@import "../../css/style.css";
</style>
