<template lang="">
  <div>
    <el-table class="table-border" :data="tableData" empty-text="loading..." :row-style="{ height: '75px' }">
      <el-table-column label="Latest Transactions" width="250">
        <template v-slot:default="scope">
          <el-row>
            <el-col :span="6">
              <div class="list-icon-circle">
                <p style="font-size: 15px; font-weight: bold">Tx</p>
              </div>
            </el-col>
            <el-col :span="18">
              <!-- <router-link :to="'/tx/' + scope.row.hash">
                  {{ scope.row.hash.slice(0, 15) + "..." }}</router-link> -->
              <div>{{ scope.row.hash.slice(0, 15) + '...' }}</div>
              <div>{{ getAge(scope.row.createTime) }}</div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column width="250">
        <template v-slot:default="scope">
          <div>
            <div>
              <!-- From <router-link :to="'/address/' + scope.row.from">
                {{ scope.row.from.slice(0, 19) + "..." }}</router-link> -->
              From {{ scope.row.from.slice(0, 19) + '...' }}
            </div>
            <div>
              <!-- To <router-link :to="'/address/' + scope.row.to">
                {{ scope.row.to.slice(0, 19) + "..." }}</router-link> -->
              To {{ scope.row.to.slice(0, 19) + '...' }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot:default="scope">
          <div>
            <el-tooltip effect="dark" content="amount" placement="right">
              <div style="text-align: right">
                <!-- <el-tag type="info">{{ this.$wei2gwei(scope.row.gas) }} Gwei</el-tag> -->
                <el-tag type="info">
                  {{ ethers.utils.formatUnits(parseInt(scope.row.gas * scope.row.gasPrice).toString(), 18) }} Eth
                </el-tag>
              </div>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { GetTransactions } from '../../script/service/transactionService';
import { getAge } from '../../script/utils';
import { ethers } from 'ethers';

const res = await GetTransactions(0, 10);
const tableData = res.data.items;
console.log('GetTransactions', res);
</script>
<style lang="less" scoped>
@import '../../css/style.css';
</style>
