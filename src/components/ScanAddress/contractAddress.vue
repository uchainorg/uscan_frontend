<template lang="">
  <div>
    <div class="center-row">
      <h4>Contract : {{ address }}</h4>
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
                  <el-col :span="10">Balance:</el-col>
                  <el-col :span="14">{{ this.$wei2eth(this.info.balance) + " Eth" }}</el-col>
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
                  <span>More Info</span>
                </div>
              </template>
              <div class="card-content">
                <el-row>
                  <el-col :span="10">Creator:</el-col>
                  <el-col :span="14">
                    <router-link :to="'/address/' + this.info.creator">{{ this.info.creator.slice(0, 15) + "..." }}</router-link>
                    at txn
                    <router-link :to="'/tx/' + this.info.txHash">{{ this.info.txHash.slice(0, 15) + "..." }}</router-link>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 2%">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
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
        <el-tab-pane v-if="!this.verified" label="Contract" name="contract">
          <contract-info :contractAddress="address" :code="codeContent"></contract-info>
        </el-tab-pane>
        <el-tab-pane v-if="this.verified" label="Contract(verified)" name="contract-verified">
          <verified-contract-info :contractAddress="address"></verified-contract-info>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { GetTxsByAddress, GetContractContent } from "../../js/request.js";
import generalTxs from "../Transaction/generalTxs.vue";
import contractInfo from "../ScanContract/contractInfo.vue";
export default defineComponent({
  name: "contractAddress",
  props: ["address", "info"],
  components: { generalTxs, contractInfo },
  data() {
    return {
      // activeName: "contract-verified",
      activeName: "transactions",
      generalTransactionsList: [],
      generalTransactionsHeaderList: [
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
          label: "Value",
          key: "value",
        },
        {
          label: "Txn Fee",
          key: "gas",
        },
      ],
      generalCurrentPage: 1,
      generalPageSize: 25,
      small: true,
      generalTotal: 0,
      codeContent: "",
      verified: false,
    };
  },
  created() {
    this.getGeneralTransactionsList();
    this.getContractContent();
  },
  mounted() {
    this.codeContent = this.info.code;
  },
  beforeCreate() {
    document.title = "Contract | The Coq Explorer";
  },
  watch: {
    async address(newVal) {
      this.tableDate = [];
      this.generalCurrentPage = 1;
      this.generalPageSize = 25;
      let res = await GetTxsByAddress(this.$rpc_http, newVal, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
      this.getContractContent();
      this.activeName = "transactions";
    },
  },
  methods: {
    async getGeneralTransactionsList() {
      let res = await GetTxsByAddress(this.$rpc_http, this.address, this.generalCurrentPage - 1, this.generalPageSize);
      // console.log("getGeneralTransactionsList", res);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
    },
    handleTabClick(tab) {
      // console.log(tab.props);
      if (tab.props.name == "internalTxns") {
        this.getInternalTransactionsList();
      } else if (tab.props.name == "erc20TokenTxns") {
        this.getErc20TransactionsList();
      } else if (tab.props.name == "erc721TokenTxns") {
        this.getErc721lTransactionsList();
      }
    },
    async GeneralHandleCurrentChange(val) {
      this.tableDate = [];
      this.generalCurrentPage = val;
      let res = await GetTxsByAddress(this.$rpc_http, this.address, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
    },
    async GeneralHandleSizeChange(val) {
      this.tableDate = [];
      this.generalCurrentPage = 1;
      this.generalPageSize = val;
      let res = await GetTxsByAddress(this.$rpc_http, this.address, this.generalCurrentPage - 1, this.generalPageSize);
      this.generalTransactionsList = res.resList;
      this.generalTotal = res.total;
    },
    async getContractContent() {
      let data = {};
      try {
        data = await GetContractContent(this.$rpc_http, this.address);
        // console.log(data);
      } catch (err) {
        console.log(err.response);
      }
      if (data) {
        if (Object.keys(data).length != 0) {
          this.verified = true;
        }
      }
    },
  },
});
</script>
<style lang="less" scoped>
.container-display {
  display: flex;
  justify-content: center;
  width: 100%;
}
@import "../../css/style.css";
</style>
