<template lang="">
  <div>
    <div class="center-row">
      <h4 class="h4-title">
        Contract <span class="small text-secondary">&nbsp;&nbsp;{{ props.address }}</span>
      </h4>
      &nbsp;
      <copy-icon :text="props.address"></copy-icon>
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
                  <el-col :span="14">{{ ethers.utils.formatUnits(props.addressInfo.balance, 18) }} Eth</el-col>
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
                    <router-link :to="'/address/' + props.addressInfo.creator">{{
                      props.addressInfo.creator.slice(0, 15) + '...'
                    }}</router-link>
                    at txn
                    <router-link :to="'/tx/' + props.addressInfo.txHash">{{
                      props.addressInfo.txHash.slice(0, 15) + '...'
                    }}</router-link>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Transactions" name="txs">
          <generate-transactions :txsData="txsData" :headerData="TransactionsHeaderList"></generate-transactions>
          <div style="margin-top: 1%; display: flex; justify-content: center">
            <el-pagination
              small
              background
              :currentPage="currentPageIndex"
              :page-size="pageSizeNumber"
              :page-sizes="[10, 25, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <div style="float: right; margin-top: -25px">
            <div class="download">[ Download</div>
            <router-link class="download" :to="'/exportData?type=txns' + '&a=' + props.address">
              excel Export
            </router-link>
            <div class="download">
              <el-icon><Download /></el-icon>]
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="internalCount != 0" name="internal">
          <template #label>
            <span>Internal Txns({{ internalCount }})</span>
          </template>
          <internal-transactions
            :txsData="internalTxsData"
            :headerData="InternalTransactionsHeaderList"
          ></internal-transactions>
          <div style="margin-top: 1%; display: flex; justify-content: center">
            <el-pagination
              small
              background
              :currentPage="currentPageIndexInternal"
              :page-size="pageSizeNumberInternal"
              :page-sizes="[10, 25, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="internalCount"
              @size-change="handleInternalSizeChange"
              @current-change="handleInternalCurrentChange"
            />
          </div>
          <div style="float: right; margin-top: -25px">
            <div class="download">[ Download</div>
            <router-link class="download" :to="'/exportData?type=txns-internal' + '&a=' + props.address">
              excel Export
            </router-link>
            <div class="download">
              <el-icon><Download /></el-icon>]
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="!isVerify" label="Contract" name="contract">
          <contract-info :contractAddress="address" :codeContent="props.addressInfo.code"></contract-info>
        </el-tab-pane>
        <el-tab-pane v-else label="Contract(verified)" name="contract-verified">
          <contract-verified-info :contractAddress="address" :contractInfo="contractContent"></contract-verified-info>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue';
import { AddressDetail } from '../../script/model/address';
import { ethers } from 'ethers';
import {
  TransactionDetail,
  InternalTransactionDetail,
  TransactionsHeaderList,
  InternalTransactionsHeaderList,
} from '../../script/model/transaction';
import { GetVerifyContractContent } from '../../script/service/contractService';
import { ContractContent } from '../../script/model/contract';
import { GetTransactionsByAddress, GetInternalTransactionsByAddress } from '../../script/service/transactionService';

const props = defineProps({
  address: String,
  addressInfo: {
    type: Object as () => AddressDetail,
  },
});

const activeName = ref('txs');
const txsData: TransactionDetail[] = reactive([]);
const internalTxsData: InternalTransactionDetail[] = reactive([]);
const currentPageIndex = ref(1);
const pageSizeNumber = ref(25);
const currentPageIndexInternal = ref(1);
const pageSizeNumberInternal = ref(25);
const total = ref(0);
const contractContent = ref({} as ContractContent);
const isVerify = ref(false);
const internalCount = ref(0);

const handleSizeChange = async (pageSizeArg: number) => {
  txsData.length = 0;
  currentPageIndex.value = 1;
  pageSizeNumber.value = pageSizeArg;
  const res = await GetTransactionsByAddress(
    currentPageIndex.value - 1,
    pageSizeNumber.value,
    'txs',
    props.address as string
  );
  res.data.items.forEach((element) => {
    txsData.push(element);
  });
  total.value = res.data.total;
};

const handleCurrentChange = async (currentPageArg: number) => {
  txsData.length = 0;
  currentPageIndex.value = currentPageArg;
  const res = await GetTransactionsByAddress(
    currentPageIndex.value - 1,
    pageSizeNumber.value,
    'txs',
    props.address as string
  );
  res.data.items.forEach((element) => {
    txsData.push(element);
  });
  total.value = res.data.total;
};

const handleInternalSizeChange = async (pageSizeArg: number) => {
  internalTxsData.length = 0;
  currentPageIndexInternal.value = 1;
  pageSizeNumberInternal.value = pageSizeArg;
  const res = await GetInternalTransactionsByAddress(
    currentPageIndex.value - 1,
    pageSizeNumber.value,
    props.address as string
  );
  res.data.items.forEach((element) => {
    internalTxsData.push(element);
  });
  internalCount.value = res.data.total;
};

const handleInternalCurrentChange = async (currentPageArg: number) => {
  internalTxsData.length = 0;
  currentPageIndexInternal.value = currentPageArg;
  const res = await GetInternalTransactionsByAddress(
    currentPageIndex.value - 1,
    pageSizeNumber.value,
    props.address as string
  );
  res.data.items.forEach((element) => {
    internalTxsData.push(element);
  });
  internalCount.value = res.data.total;
};

watchEffect(async () => {
  currentPageIndex.value = 1;
  pageSizeNumber.value = 25;

  // console.log('watch');
  txsData.length = 0;
  const res = await GetTransactionsByAddress(
    currentPageIndex.value - 1,
    pageSizeNumber.value,
    'txs',
    props.address as string
  );
  // console.log(res);
  res.data.items.forEach((element) => {
    txsData.push(element);
  });
  total.value = res.data.total;

  internalTxsData.length = 0;
  const resInternal = await GetInternalTransactionsByAddress(
    currentPageIndexInternal.value - 1,
    pageSizeNumberInternal.value,
    props.address as string
  );
  resInternal.data.items.forEach((element) => {
    internalTxsData.push(element);
  });
  internalCount.value = resInternal.data.total;
  // console.log('internalTxsData', internalTxsData);

  const contractContentRes = await GetVerifyContractContent(props.address as string);
  contractContent.value = contractContentRes.data;
  if (contractContentRes.data) {
    isVerify.value = true;
  }
  // console.log('contractContentRes', contractContentRes.data);
  activeName.value = 'txs';
});
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
