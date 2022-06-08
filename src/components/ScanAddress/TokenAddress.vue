<template lang="">
  <div>
    <div class="center-row">
      <h4>Token : {{ address }}</h4>
      &nbsp;
      <copy-icon :text="this.address"></copy-icon>
    </div>

    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div>
            <el-card class="box-card-address">
              <template #header>
                <div class="card-header">
                  <span>Overview</span>
                </div>
              </template>
              <div class="card-content">
                <el-row>
                  <el-col :span="9">Max Total Supply:</el-col>
                  <el-col :span="15">{{ this.maxTotalSupply }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">Holders:</el-col>
                  <el-col :span="15">{{ this.holdersTotal }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">Transfers:</el-col>
                  <el-col :span="15">{{ this.transfersTotal }}</el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-card class="box-card-address">
              <template #header>
                <div class="card-header">
                  <span>Profile Summary</span>
                </div>
              </template>
              <div class="card-content">
                <el-row>
                  <el-col :span="9">Contract:</el-col>
                  <el-col :span="15">
                    <router-link :to="'/address/' + this.address">{{ this.address }}</router-link>
                  </el-col>
                </el-row>
                <div v-if="this.tokenType == 'erc20'">
                  <el-row>
                    <el-col :span="9">Decimals:</el-col>
                    <el-col :span="15">{{ this.decimals }}</el-col>
                  </el-row>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 2%">
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
import { GetTokenType, GetAddressInfo, GetTokenHolders, GetTxsByToken } from "../../js/request.js";
export default defineComponent({
  name: "TokenAddress",
  props: ["address"],
  data() {
    return {
      activeName: "transactions",
      tokenType: "",
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
      transfersTotal: 0,
      maxTotalSupply: 0,
      decimals: 0,
    };
  },
  created() {
    this.GetTokenType();
  },
  beforeCreate() {
    document.title = "Token | The Coq Explorer";
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
      this.transfersTotal = total;
      this.GetAccountInfo();
    },
    async GetAccountInfo() {
      let res = await GetAddressInfo(this.$rpc_http, this.address);

      let totalSupply = 0;
      if (this.tokenType == "erc20") {
        totalSupply = res.tokenTotalSupply;
        this.decimals = res.decimals;
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
      this.maxTotalSupply = totalSupply;
    },
    async GetTokenHoldersTotal() {
      let res = await GetTokenHolders(this.$rpc_http, this.address, this.tokenType, this.holdersCurrentPage - 1, this.holdersPageSize);
      this.holdersList = res.items;
      this.holdersTotal = res.total;
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
<style lang="less" scoped>
@import "../../css/style.css";
</style>
