<template lang="">
  <div>Searching... {{ searchText }}</div>
</template>
<script>
import { defineComponent } from "vue";
import { GetSearchType } from "../../js/request.js";
export default defineComponent({
  name: "SearchRes",
  props: ["searchText"],
  data() {
    return {
      searchResult: {},
    };
  },
  created() {
    this.QuerySearch();
  },
  methods: {
    async QuerySearch() {
      let queryArg = this.searchText;
      //console.log(queryArg);
      let typeMap = {
        1: { display: "Null", route: "" },
        2: { display: "Address", route: "/address/" },
        3: { display: "Block", route: "/block/" },
        4: { display: "Transaction", route: "/tx/" },
      };
      if (queryArg !== "") {
        if (queryArg.length == 42 || !isNaN(Number(queryArg))) {
          let type = await this.GetSearchType(1, queryArg);
          if (type == 1 || type == 0) {
            this.searchResult = {};
          } else {
            this.searchResult = { value: typeMap[parseInt(type)].display + " : " + queryArg, link: typeMap[parseInt(type)].route + queryArg };
          }
        } else {
          this.searchResult = {};
        }
      } else {
        this.searchResult = {};
      }
      if (this.searchResult.value) {
        this.$router.push(this.searchResult.link);
      } else {
        this.$router.push("/notFound");
      }
    },
    async GetSearchType(filterType, keyWord) {
      let res = await GetSearchType(this.$rpc_http, filterType, keyWord);
      return res;
    },
  },
});
</script>
<style lang=""></style>
