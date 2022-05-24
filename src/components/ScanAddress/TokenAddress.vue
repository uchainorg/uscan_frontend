<template lang="">
  <div>
    <h3 style="display: inline">Token</h3>
    &nbsp;
    <p style="display: inline">{{ address }}</p>
    <div class="container-display">
      <div style="width: 50%">
        <h4>Overview ({{ this.tokenType }})</h4>
        <el-table :data="addressOverviewTableData" style="margin-top: -3%; width: 95%" empty-text="loading...">
          <el-table-column prop="parameterDisplay"></el-table-column>
          <el-table-column prop="parameterValue">
            <template v-slot:default="scope"> {{ scope.row.parameterValue }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin-top: 3%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Transactions" name="transactions">
          <general-txs :txsData="generalTransactionsList" :headerData="generalTransactionsHeaderList"></general-txs>
          <div style="margin-top: 1%; display: flex; justify-content: center">
            <el-pagination
              :currentPage="generalCurrentPage"
              :page-size="generalPageSize"
              :page-sizes="[10, 25, 50, 100]"
              :pager-count="5"
              :small="small"
              layout="total, sizes, prev, pager, next, jumper"
              :total="generalTotal"
              @size-change="GeneralHandleSizeChange"
              @current-change="GeneralHandleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Holders" name="Holders">
          <general-txs :txsData="holdersList" :headerData="holdersHeaderList"></general-txs>
          <div style="margin-top: 1%; display: flex; justify-content: center">
            <el-pagination
              :currentPage="holdersCurrentPage"
              :page-size="holdersPageSize"
              :page-sizes="[10, 25, 50, 100]"
              :pager-count="5"
              :small="small"
              layout="total, sizes, prev, pager, next, jumper"
              :total="holdersTotal"
              @size-change="HoldersHandleSizeChange"
              @current-change="HoldersHandleCurrentChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetTokenType } from "../../js/request.js";
import { GetAddressInfo } from "../../js/request.js";
import { GetTokenHolders } from "../../js/request.js";
import { GetTxsByToken } from "../../js/request.js";
export default defineComponent({
  name: "TokenAddress",
  props: ["address"],
  data() {
    return {
      activeName: "transactions",
      tokenType: "",
      addressOverviewTableData: [],
      generalTransactionsList: [],
      generalTransactionsHeaderList: [],
      generalCurrentPage: 1,
      generalPageSize: 25,
      small: true,
      generalTotal: 0,

      holdersList: [],
      holdersHeaderList: [
        {
          label: "Address",
          key: "owner",
        },
        {
          label: "Quantity",
          key: "quantity",
        },
      ],
      holdersCurrentPage: 1,
      holdersPageSize: 25,
      holdersTotal: 0,
    };
  },
  created() {
    this.GetTokenType();
    this.addressOverviewTableData.push({
      parameterName: "contract",
      parameterDisplay: "Contract:",
      parameterValue: this.address,
    });
  },
  methods: {
    async GeneralHandleCurrentChange(val) {
      this.generalTransactionsList = [];
      this.generalCurrentPage = val;
      let res = await GetTxsByToken(this.$rpc_http, this.address, this.tokenType, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
    },
    async GeneralHandleSizeChange(val) {
      this.generalTransactionsList = [];
      this.generalCurrentPage = 1;
      this.generalPageSize = val;
      let res = await GetTxsByToken(this.$rpc_http, this.address, this.tokenType, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
    },
    async HoldersHandleCurrentChange(val) {
      this.holdersList = [];
      this.holdersCurrentPage = val;
      let res = await GetTokenHolders(this.$rpc_http, this.address, this.tokenType, this.holdersCurrentPage - 1, this.holdersPageSize);
      this.holdersList = res.items;
      this.holdersTotal = res.total;
    },
    async HoldersHandleSizeChange(val) {
      this.holdersList = [];
      this.holdersCurrentPage = 1;
      this.holdersPageSize = val;
      let res = await GetTokenHolders(this.$rpc_http, this.address, this.tokenType, this.holdersCurrentPage - 1, this.holdersPageSize);
      this.holdersList = res.items;
      this.holdersTotal = res.total;
    },
    async GetTokenType() {
      let res = await GetTokenType(this.$rpc_http, this.address);
      this.tokenType = res;
      this.GetTokenHoldersTotal();
      let total = await this.GetTxsByToken();
      this.addressOverviewTableData.push({
        parameterName: "transfers",
        parameterDisplay: "Transfers:",
        parameterValue: total,
      });
      this.GetAccountInfo();
    },
    async GetAccountInfo() {
      let res = await GetAddressInfo(this.$rpc_http, this.address);
      //   if (res.code) {
      //     this.comName = "contractAddress";
      //   } else {
      //     this.comName = "accountAddress";
      //   }
      // this.addressInfo = res;

      let totalSupply = 0;
      if (this.tokenType == "erc20") {
        this.addressOverviewTableData.push({
          parameterName: "decimals",
          parameterDisplay: "Decimals:",
          parameterValue: res.decimals,
        });
        totalSupply = res.tokenTotalSupply;
        this.generalTransactionsHeaderList = [
          {
            label: "Txn Hash",
            key: "hash",
          },
          {
            label: "Method",
            key: "method",
          },
          {
            label: "Block",
            key: "blockNumber",
          },
          {
            label: "Age",
            key: "age",
          },
          {
            label: "From",
            key: "from",
          },
          {
            label: "To",
            key: "to",
          },
          {
            label: "Quantity",
            key: "quantity",
          },
        ];
      } else {
        totalSupply = res.nftTotalSupply;
        this.generalTransactionsHeaderList = [
          {
            label: "Txn Hash",
            key: "hash",
          },
          {
            label: "Method",
            key: "method",
          },
          {
            label: "Block",
            key: "blockNumber",
          },
          {
            label: "Age",
            key: "age",
          },
          {
            label: "From",
            key: "from",
          },
          {
            label: "To",
            key: "to",
          },
          {
            label: "TokenID",
            key: "tokenID",
          },
        ];
      }
      this.addressOverviewTableData.push({
        parameterName: "totalSupply",
        parameterDisplay: "Max Total Supply:",
        parameterValue: totalSupply,
      });
    },
    async GetTokenHoldersTotal() {
      let res = await GetTokenHolders(this.$rpc_http, this.address, this.tokenType, this.holdersCurrentPage - 1, this.holdersPageSize);
      this.addressOverviewTableData.push({
        parameterName: "holders:",
        parameterDisplay: "Holders:",
        parameterValue: res.total,
      });
      this.holdersList = res.items;
      this.holdersTotal = res.total;
      console.log(res);
    },
    async GetTxsByToken() {
      let res = await GetTxsByToken(this.$rpc_http, this.address, this.tokenType, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
      return res.total;
    },
  },
});
</script>
<style lang=""></style>
