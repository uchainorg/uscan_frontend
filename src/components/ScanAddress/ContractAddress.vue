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
                <span>
                  Overview&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 0.96rem; color: #9ba2aa; font-weight: bold">{{
                    type
                  }}</span>
                </span>
              </template>
              <div class="card-content">
                <el-row>
                  <el-col :span="10">Balance:</el-col>
                  <el-col :span="14"
                    >{{ ethers.utils.formatUnits(props.addressInfo.balance, props.addressInfo.decimals) }}
                    {{ getUnitDisplay() }}</el-col
                  >
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
                <el-row class="el-row" style="word-break: break-all">
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
                <el-row v-if="props.addressInfo.symbol !== ''" style="word-break: break-all">
                  <el-col :span="10">Token Tracker:</el-col>
                  <el-col :span="14">
                    <router-link :to="'/token/' + props.address">
                      {{ props.addressInfo.name }} ({{ props.addressInfo.symbol }})
                    </router-link>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="Transactions" name="txs">
        <generate-transactions
          :txsData="txsData"
          :headerData="headerData"
          :loadStatus="isEmpty"
        ></generate-transactions>
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
        <!-- <div style="float: right; margin-top: -25px">
          <div class="download">[ Download</div>
          <router-link class="download" :to="'/exportData?type=txns' + '&a=' + props.address">
            excel Export
          </router-link>
          <div class="download">
            <el-icon><Download /></el-icon>]
          </div>
        </div> -->
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
            :currentPage="currentPageIndex"
            :page-size="pageSizeNumber"
            :page-sizes="[10, 25, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="internalCount"
            @size-change="handleInternalSizeChange"
            @current-change="handleInternalCurrentChange"
          />
        </div>
        <!-- <div style="float: right; margin-top: -25px">
          <div class="download">[ Download</div>
          <router-link class="download" :to="'/exportData?type=txns-internal' + '&a=' + props.address">
            excel Export
          </router-link>
          <div class="download">
            <el-icon><Download /></el-icon>]
          </div>
        </div> -->
      </el-tab-pane>
      <el-tab-pane v-if="erc20count != 0" name="erc20">
        <template #label>
          <span>Erc20 Token Txns({{ erc20count }})</span>
        </template>
        <generate-transactions
          :txsData="txsData"
          :headerData="headerData"
          :loadStatus="isEmpty"
        ></generate-transactions>
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
        <!-- <div style="float: right; margin-top: -25px">
          <div class="download">[ Download</div>
          <router-link class="download" :to="'/exportData?type=txns-erc20' + '&a=' + props.address">
            excel Export
          </router-link>
          <div class="download">
            <el-icon><Download /></el-icon>]
          </div>
        </div> -->
      </el-tab-pane>
      <el-tab-pane v-if="erc721count != 0" name="erc721">
        <template #label>
          <span>Erc721 Token Txns({{ erc721count }})</span>
        </template>
        <generate-transactions
          :txsData="txsData"
          :headerData="headerData"
          :loadStatus="isEmpty"
        ></generate-transactions>
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
        <!-- <div style="float: right; margin-top: -25px">
          <div class="download">[ Download</div>
          <router-link class="download" :to="'/exportData?type=txns-erc721' + '&a=' + props.address">
            excel Export
          </router-link>
          <div class="download">
            <el-icon><Download /></el-icon>]
          </div>
        </div> -->
      </el-tab-pane>
      <el-tab-pane v-if="erc1155count != 0" name="erc1155">
        <template #label>
          <span>Erc1155 Token Txns({{ erc1155count }})</span>
        </template>
        <generate-transactions
          :txsData="txsData"
          :headerData="headerData"
          :loadStatus="isEmpty"
        ></generate-transactions>
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
        <!-- <div style="float: right; margin-top: -25px">
          <div class="download">[ Download</div>
          <router-link class="download" :to="'/exportData?type=txns-erc1155' + '&a=' + props.address">
            excel Export
          </router-link>
          <div class="download">
            <el-icon><Download /></el-icon>]
          </div>
        </div> -->
      </el-tab-pane>
      <el-tab-pane v-if="!isVerify" label="Contract" name="contract">
        <contract-info :contractAddress="address" :codeContent="props.addressInfo.code"></contract-info>
      </el-tab-pane>
      <el-tab-pane v-else label="Contract(verified)" name="contract-verified">
        <contract-verified-info
          :codeIndex="codeIndex"
          :contractAddress="address"
          :contractInfo="contractContent"
          :proxyContractAddress="proxyContractAddress"
        ></contract-verified-info>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { watch, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { AddressDetail } from '../../script/model/address';
import { ethers } from 'ethers';
import { TableHeader } from '../../script/model/index';
import { GetTransactionsByAddress, GetInternalTransactionsByAddress } from '../../script/service/transactionService';
import {
  TransactionDetail,
  TransactionsHeaderList,
  Erc721TransactionsHeaderList,
  Erc20TransactionsHeaderList,
  InternalTransactionsHeaderList,
  InternalTransactionDetail,
} from '../../script/model/transaction';
import { ContractContent } from '../../script/model/contract';
import { GetVerifyContractContent } from '../../script/service/contractService';
import { GetAddressTxsTotal } from '../../script/service/addressService';
import { getUnitDisplay } from '../../script/global';

const props = defineProps({
  address: String,
  addressInfo: {
    type: Object as () => AddressDetail,
  },
});

const route = useRoute();

const activeName = ref('txs');
const txsData: TransactionDetail[] = reactive([]);
const internalTxsData: InternalTransactionDetail[] = reactive([]);
const headerData: TableHeader[] = reactive([]);
const currentPageIndex = ref(1);
const pageSizeNumber = ref(25);
const total = ref(0);
const internalCount = ref(0);
const contractContent = ref({} as ContractContent);
const isVerify = ref(false);
const erc20count = ref(0);
const erc721count = ref(0);
const erc1155count = ref(0);
const isEmpty = ref(true);
const proxyContractAddress = ref('');
const type = ref('');
const codeIndex = ref<Number>(0);

const showCodeIndex = (index: Number) => {
  console.log('activeName.value', activeName.value);
  activeName.value = 'contract-verified';
  codeIndex.value = index;
};

const initPageContent = async () => {
  document.title = 'Contract ' + props.address;

  if (route.query.codeIndex) {
    showCodeIndex(Number(route.query.codeIndex));
  }

  if (props.addressInfo?.erc20) {
    type.value = 'erc20';
  } else if (props.addressInfo?.erc721) {
    type.value = 'erc721';
  } else if (props.addressInfo?.erc1155) {
    type.value = 'erc1155';
  }

  const resTotal = await GetAddressTxsTotal(props.address as string);

  // tx data
  if (activeName.value === 'txs') {
    headerData.push(...TransactionsHeaderList);
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
    if (res.data.total == 0) {
      isEmpty.value = false;
    }
  }

  // internal tx data
  internalCount.value = parseInt(resTotal.data.internalTotal);
  if (activeName.value == 'internal' && parseInt(resTotal.data.internalTotal) != 0) {
    const resInternal = await GetInternalTransactionsByAddress(
      currentPageIndex.value - 1,
      pageSizeNumber.value,
      props.address as string
    );
    headerData.push(...InternalTransactionsHeaderList);
    resInternal.data.items.forEach((element) => {
      internalTxsData.push(element);
    });
  }

  // erc20 tx data
  erc20count.value = parseInt(resTotal.data.erc20Total);
  if (activeName.value == 'erc20') {
    if (parseInt(resTotal.data.erc20Total) != 0) {
      const resErc20 = await GetTransactionsByAddress(
        currentPageIndex.value - 1,
        pageSizeNumber.value,
        'erc20',
        props.address as string
      );
      headerData.push(...Erc20TransactionsHeaderList);
      resErc20.data.items.forEach((element) => {
        txsData.push(element);
      });
    } else {
      isEmpty.value = false;
    }
  }

  // erc721 tx data
  erc721count.value = parseInt(resTotal.data.erc721Total);
  if (activeName.value == 'erc721') {
    if (resTotal.data.erc721Total) {
      const resErc721 = await GetTransactionsByAddress(
        currentPageIndex.value - 1,
        pageSizeNumber.value,
        'erc721',
        props.address as string
      );
      headerData.push(...Erc721TransactionsHeaderList);
      resErc721.data.items.forEach((element) => {
        txsData.push(element);
      });
    } else {
      isEmpty.value = false;
    }
  }

  // erc1155 tx data
  erc1155count.value = parseInt(resTotal.data.erc1155Total);
  if (activeName.value == 'erc1155') {
    if (parseInt(resTotal.data.erc1155Total) != 0) {
      const resErc1155 = await GetTransactionsByAddress(
        currentPageIndex.value - 1,
        pageSizeNumber.value,
        'erc1155',
        props.address as string
      );
      headerData.push(...Erc721TransactionsHeaderList);
      resErc1155.data.items.forEach((element) => {
        txsData.push(element);
      });
    } else {
      isEmpty.value = false;
    }
  }

  // contract
  const contractContentRes = await GetVerifyContractContent(props.address as string);
  contractContent.value = contractContentRes.data.contract;
  proxyContractAddress.value = contractContentRes.data.proxyContractAddress;
  if (contractContentRes.data.contract) {
    isVerify.value = true;
  }
};

initPageContent();

watch(props, async () => {
  currentPageIndex.value = 1;
  pageSizeNumber.value = 25;
  txsData.length = 0;
  headerData.length = 0;
  isEmpty.value = true;
  internalTxsData.length = 0;

  initPageContent();
});

watch(route, () => {
  showCodeIndex(Number(route.query.codeIndex));
});

watch(activeName, async (currentValue) => {
  if (currentValue !== 'contract') {
    currentPageIndex.value = 1;
    pageSizeNumber.value = 25;

    console.log('switch', currentValue);
    txsData.length = 0;
    headerData.length = 0;
    if (activeName.value === 'txs') {
      headerData.push(...TransactionsHeaderList);
    } else if (activeName.value === 'erc20') {
      headerData.push(...Erc20TransactionsHeaderList);
    } else if (activeName.value === 'erc721') {
      headerData.push(...Erc721TransactionsHeaderList);
    } else if (activeName.value === 'erc1155') {
      headerData.push(...Erc721TransactionsHeaderList);
    } else if (activeName.value === 'internal') {
      headerData.push(...InternalTransactionsHeaderList);
    }

    if (activeName.value == 'internal') {
      internalTxsData.length = 0;
      const resInternal = await GetInternalTransactionsByAddress(
        currentPageIndex.value - 1,
        pageSizeNumber.value,
        props.address as string
      );
      resInternal.data.items.forEach((element) => {
        internalTxsData.push(element);
      });
      internalCount.value = resInternal.data.total;
    } else if (activeName.value !== 'contract-verified') {
      const res = await GetTransactionsByAddress(
        currentPageIndex.value - 1,
        pageSizeNumber.value,
        activeName.value,
        props.address as string
      );
      res.data.items.forEach((element) => {
        txsData.push(element);
      });
      total.value = res.data.total;
      if (res.data.total == 0) {
        isEmpty.value = false;
      }
    }
  }
});

const handleSizeChange = async (pageSizeArg: number) => {
  txsData.length = 0;
  currentPageIndex.value = 1;
  pageSizeNumber.value = pageSizeArg;
  const res = await GetTransactionsByAddress(
    currentPageIndex.value - 1,
    pageSizeNumber.value,
    activeName.value,
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
    activeName.value,
    props.address as string
  );
  res.data.items.forEach((element) => {
    txsData.push(element);
  });
  total.value = res.data.total;
};

const handleInternalSizeChange = async (pageSizeArg: number) => {
  internalTxsData.length = 0;
  currentPageIndex.value = 1;
  pageSizeNumber.value = pageSizeArg;
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
  currentPageIndex.value = currentPageArg;
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
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
