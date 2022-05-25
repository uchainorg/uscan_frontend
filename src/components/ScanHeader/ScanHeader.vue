<template lang="">
  <div class="header-container">
    <div class="header-title-container" :style="{ fontSize: fsize + 'px' }">
      {{ title }}
    </div>
    <div class="header-input-container">
      <el-link style="align-self: flex-start; margin-bottom: 2%" type="primary" @click="moveToHome">Home</el-link>
      <el-link style="align-self: flex-start; margin-bottom: 1%" type="primary" @click="moveToErc('erc20')">erc20</el-link>
      <el-link style="align-self: flex-start; margin-bottom: 1%" type="primary" @click="moveToErc('erc721')">erc721</el-link>
      <el-link style="align-self: flex-start; margin-bottom: 2%" type="primary" @click="moveToErc('erc1155')">erc1155</el-link>
      <el-autocomplete class="inline-input" v-model="inputValue" :fetch-suggestions="querySearch" placeholder="Search by Address / Txhash / Block" @select="handleSubmit"></el-autocomplete>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetSearchType } from "../../js/request.js";
export default defineComponent({
  name: "ScanHeader",
  props: {
    title: {
      type: String,
      default: "ankr chain scan",
    },
    fsize: {
      type: Number,
      default: 35,
    },
  },
  data() {
    return {
      lastBlockNumber: 0,
      inputValue: "",
    };
  },
  methods: {
    moveToHome() {
      this.$router.push("/");
    },
    moveToErc(erc) {
      this.$router.push("/transactions/" + erc);
    },
    handleSubmit(arg) {
      this.$router.push(arg.link);
      this.inputValue = "";
    },
    //输入框获取焦点时调用的方法
    async querySearch(queryString, cb) {
      let queryArg = queryString.trim();
      let typeMap = {
        1: { display: "Null", route: "" },
        2: { display: "Address", route: "/address/" },
        3: { display: "Block", route: "/block/" },
        4: { display: "Transaction", route: "/tx/" },
      };
      let results = [];
      if (queryArg !== "") {
        if (queryArg.length == 42 || !isNaN(Number(queryArg))) {
          let type = await this.GetSearchType(1, queryArg);
          if (type == 1 || type == 0) {
            results.push({ value: "Not Found", link: "404" });
          } else {
            results.push({ value: typeMap[parseInt(type)].display + " : " + queryArg, link: typeMap[parseInt(type)].route + queryArg });
          }
        }
      }
      cb(results);
    },
    async GetSearchType(filterType, keyWord) {
      let res = await GetSearchType(this.$rpc_http, filterType, keyWord);
      return res;
    },
  },
});
</script>
<style lang="less" scoped>
.header-container {
  display: flex;
  margin-top: 50px;
  justify-content: center;
}

.header-title-container {
  width: 30%;
  font-family: "Gill Sans", Times, serif;
  margin-top: 2%;
}

.header-input-container {
  width: 30%;
  display: flex;
  flex-direction: column;
}
</style>
