<template lang="">
  <div class="header-menu">
    <div class="home-header">
      <el-row>
        <el-col :span="21">
          <div class="header-left-items" @click="moveToHome">
            <img src="../../assets/logo.png" width="35" height="35" />
            &nbsp;&nbsp;
            <h1>Coq Chain Scan</h1>
          </div>
        </el-col>
        <el-col :span="3">
          <div style="display: flex; flex-direction: row; align-items: center; height: 100%">
            <!-- <el-button text style="font-size: 15px; font-weight: bold" @click="moveToHome">Home</el-button> -->
            <router-link :to="'/'" style="font-size: 15px; font-weight: bold"> Home </router-link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-dropdown>
              <span style="font-size: 15px; font-weight: bold">
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
        </el-col>
        <div style="margin-top: 50px">
          <h1 style="color: white">The Coq Chain Explorer</h1>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
            <el-icon color="white" :size="23"><Search /></el-icon>
            <el-autocomplete
              v-model="inputValue"
              :fetch-suggestions="querySearch"
              placeholder="Search by Address / Txhash / Block"
              @select="handleSubmit"
              style="width: 750px; margin-left: 2%"
              @keyup.enter.native="handleSearch"
              size="large"
            ></el-autocomplete>
          </div>
        </div>
      </el-row>
    </div>
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
      searchResults: [],

      // new
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
      this.inputValue = "";
      if (arg.value != "Not Found") {
        this.$router.push(arg.link);
      }
    },
    async querySearch(queryString, cb) {
      let queryArg = queryString.trim();
      let typeMap = {
        1: { display: "Null", route: "" },
        2: { display: "Address", route: "/address/" },
        3: { display: "Block", route: "/block/" },
        4: { display: "Transaction", route: "/tx/" },
      };
      this.searchResults = [];
      if (queryArg !== "") {
        if (queryArg.length == 42 || !isNaN(Number(queryArg))) {
          let type = await this.GetSearchType(1, queryArg);
          if (type == 1 || type == 0) {
            this.searchResults.push({ value: "Not Found", link: "404" });
          } else {
            this.searchResults.push({ value: typeMap[parseInt(type)].display + " : " + queryArg, link: typeMap[parseInt(type)].route + queryArg });
          }
        }
      }
      cb(this.searchResults);
    },
    async GetSearchType(filterType, keyWord) {
      let res = await GetSearchType(this.$rpc_http, filterType, keyWord);
      return res;
    },
    handleCommand(arg) {
      console.log(arg);
    },
    handleSearch() {
      if (this.searchResults.length != 0) {
        if (this.searchResults[0].value != "Not Found") {
          // console.log(this.searchResults[0].link);
          this.$router.push(this.searchResults[0].link);
        }
      }
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../css/style.css";
.header-left {
  display: flex;
}

.header-left-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  // margin-left: 30%;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-menu {
  background-color: white;
  height: 60px;
}

.home-header {
  background-color: transparent;
  height: 60px;
  margin: 0 auto;
  width: 1350px;
}

.header-left-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
}
</style>
