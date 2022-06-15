<template lang="">
  <div class="header-menu">
    <div class="home-header">
      <el-row>
        <el-col :span="21">
          <div class="header-left-items" @click="refreshHome">
            <img src="../../assets/logo.png" width="33" height="33" />
            &nbsp;&nbsp;
            <p style="font-size: 23px">Coq Chain Scan</p>
          </div>
        </el-col>
        <el-col :span="3">
          <div style="display: flex; flex-direction: row; align-items: center; height: 100%">
            <router-link :to="'/'" style="font-size: 15px; font-weight: bold" @click="refreshHome"> Home </router-link>
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
        <div style="margin-top: 40px">
          <p style="color: white; font-size: 20px">The Coq Chain Explorer</p>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
            <el-autocomplete
              v-model="inputValue"
              :fetch-suggestions="querySearch"
              placeholder="Search by Address / Txhash / Block"
              @select="handleSubmit"
              style="width: 700px"
              @keyup.enter.native="handleSearch"
              size="large"
            >
            </el-autocomplete>
            <el-button text bg style="height: 42px; width: 42px; background-color: #5296d5" @click="searchFilter">
              <el-icon color="white" size="large"><Search /></el-icon>
            </el-button>
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
      searchResult: {},
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
            this.searchResult = {};
          } else {
            this.searchResults.push({ value: typeMap[parseInt(type)].display + " : " + queryArg, link: typeMap[parseInt(type)].route + queryArg });
            this.searchResult = { value: typeMap[parseInt(type)].display + " : " + queryArg, link: typeMap[parseInt(type)].route + queryArg };
          }
        } else {
          this.searchResult = {};
        }
      } else {
        this.searchResult = {};
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
    searchFilter() {
      if (this.searchResult.link) {
        this.$router.push(this.searchResult.link);
      }
    },
    refreshHome() {
      this.$router.go(0);
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
  max-width: 1350px;
}

.header-left-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
}
</style>
