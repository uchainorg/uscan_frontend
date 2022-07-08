<template lang="">
  <div>
    <h4 class="h4-title">
      Transactions {{ 'for ' + props.txsType + (blockNumber === -1 ? '' : ' of block ' + blockNumber) }}
    </h4>
    <generate-transactions :txsData="txsData" :headerData="headerData"></generate-transactions>
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
  </div>
</template>
<script lang="ts" setup>
import { GetTransactions } from '../../script/service/transactionService';
import {
  TransactionDetail,
  TransactionsHeaderList,
  Erc721TransactionsHeaderList,
  Erc20TransactionsHeaderList,
} from '../../script/model/transaction';
import { TableHeader } from '../../script/model/index';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

document.title = 'Transactions | The Coq Explorer';

const props = defineProps({
  txsType: String,
});

const currentPageIndex = ref(1);
const pageSizeNumber = ref(25);
const txsData: TransactionDetail[] = reactive([]);
const headerData: TableHeader[] = reactive([]);
const total = ref(0);
const blockNumber: number = route.query.block === undefined ? -1 : (route.query.block as unknown as number);

if (props.txsType === 'all' || props.txsType === 'erc20' || props.txsType === 'erc721' || props.txsType === 'erc1155') {
  const res = await GetTransactions(currentPageIndex.value - 1, pageSizeNumber.value, props.txsType, blockNumber);
  res.data.items.forEach((element) => {
    console.log('element', element);
    txsData.push(element);
  });
  total.value = res.data.total;
}

if (props.txsType === 'all') {
  headerData.push(...TransactionsHeaderList);
} else if (props.txsType === 'erc20') {
  headerData.push(...Erc20TransactionsHeaderList);
} else if (props.txsType === 'erc721') {
  headerData.push(...Erc721TransactionsHeaderList);
} else if (props.txsType === 'erc1155') {
  headerData.push(...Erc721TransactionsHeaderList);
}

const handleSizeChange = async (pageSizeArg: number) => {
  txsData.length = 0;
  currentPageIndex.value = 1;
  pageSizeNumber.value = pageSizeArg;
  const res = await GetTransactions(
    currentPageIndex.value - 1,
    pageSizeNumber.value,
    props.txsType as string,
    blockNumber
  );
  res.data.items.forEach((element) => {
    txsData.push(element);
  });
  total.value = res.data.total;
};

const handleCurrentChange = async (currentPageArg: number) => {
  txsData.length = 0;
  currentPageIndex.value = currentPageArg;
  const res = await GetTransactions(
    currentPageIndex.value - 1,
    pageSizeNumber.value,
    props.txsType as string,
    blockNumber
  );
  res.data.items.forEach((element) => {
    txsData.push(element);
  });
  total.value = res.data.total;
};
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
