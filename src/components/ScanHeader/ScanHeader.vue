<template lang="">
  <div>
    <el-row>
      <el-col :span="21" class="header-left">
        <div class="header-left-items" @click="moveToHome">
          <img src="../../assets/logo.png" width="35" height="35" />
          &nbsp;&nbsp;
          <h2 style="color: white">Coq Chain Scan</h2>
        </div>
      </el-col>
      <el-col :span="3" class="header-right">
        <div style="display: flex; flex-direction: column">
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
            <el-icon><Search /></el-icon>
            <el-autocomplete v-model="inputValue" :fetch-suggestions="querySearch" placeholder="Search by Address / Txhash / Block" @select="handleSubmit" style="width: 550px; margin-left: 1%"></el-autocomplete>
          </div>
          <div style="margin-top: 30px">
            <!-- <el-button text style="font-size: 15px; font-weight: bold" @click="moveToHome">Home</el-button> -->
            <router-link :to="'/'" style="font-size: 15px; font-weight: bold"> Home </router-link>
            &nbsp;&nbsp;
            <el-dropdown>
              <span style="font-size: 15px; font-weight: bold; color: white">
                Tokens<el-icon><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click.native="moveToErc('erc20')">ERC20</el-dropdown-item>
                  <el-dropdown-item @click.native="moveToErc('erc721')">ERC721</el-dropdown-item>
                  <el-dropdown-item @click.native="moveToErc('erc1155')">ERC1155</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetSearchType } from "../../js/request.js";
export default defineComponent({
  name: "ScanHeader",
  data() {
    return {
      inputValue: "",
      activeIndex: "1",
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
    handleCommand(arg) {
      console.log(arg);
    },
  },
});
</script>
<style lang="less" scoped>
.header-left {
  display: flex;
}

.header-left-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30%;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
}
</style>
