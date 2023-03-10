<template lang="">
  <div>
    <el-table
      class="table-border"
      :data="props.txOverviews"
      :show-header="false"
      empty-text="loading..."
      :row-style="{ height: '50px' }"
    >
      <el-table-column width="240">
        <template v-slot:default="scope">
          <div class="center-row">
            <el-tooltip effect="dark" placement="top">
              <template #content>
                <div style="max-width: 250px">{{ scope.row.parameterExplain }}</div>
              </template>
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
            &nbsp;{{ scope.row.parameterDisplay }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="parameterValue">
        <template v-slot:default="scope">
          <div v-if="scope.row.parameterName == 'blockNumber'" style="font-weight: 900">
            <router-link :to="'/block/' + parseInt(scope.row.parameterValue)">
              {{ parseInt(scope.row.parameterValue) }}</router-link
            >
          </div>
          <div class="center-row" v-else-if="scope.row.parameterName == 'createTime'">
            <el-icon><Clock /></el-icon>&nbsp;{{ getAge(scope.row.parameterValue) }}&nbsp; ({{
              new Date(scope.row.parameterValue * 1000).toUTCString()
            }})
          </div>
          <div class="center-row" v-else-if="scope.row.parameterName == 'hash'">
            {{ scope.row.parameterValue }} &nbsp;
            <copy-icon :text="scope.row.parameterValue"></copy-icon>
          </div>
          <div class="center-row" v-else-if="scope.row.parameterName == 'from'">
            <div class="center-row" v-if="scope.row.parameterValue.fromContract">
              Contract &nbsp;
              <router-link :to="'/address/' + scope.row.parameterValue.from">
                {{ scope.row.parameterValue.from }} &nbsp; {{ scope.row.parameterValue.fromName }}
              </router-link>
              &nbsp;
              <copy-icon :text="scope.row.parameterValue.from"></copy-icon>
            </div>
            <div class="center-row" v-else>
              <router-link :to="'/address/' + scope.row.parameterValue.from">
                {{ scope.row.parameterValue.from }}
              </router-link>
              &nbsp;
              <copy-icon :text="scope.row.parameterValue.from"></copy-icon>
            </div>
          </div>
          <div v-else-if="scope.row.parameterName == 'to'">
            <div class="center-row" v-if="scope.row.parameterValue.method == '0x60806040'">
              Contract &nbsp;
              <router-link :to="'/address/' + scope.row.parameterValue.contractAddress">{{
                scope.row.parameterValue.contractAddress
              }}</router-link>
              &nbsp; Created &nbsp;
              <copy-icon :text="scope.row.parameterValue.contractAddress"></copy-icon>
            </div>
            <div class="center-row" v-else-if="scope.row.parameterValue.toContract">
              Contract &nbsp;
              <router-link :to="'/address/' + scope.row.parameterValue.to">
                {{ scope.row.parameterValue.to }}
              </router-link>
              &nbsp;
              <copy-icon :text="scope.row.parameterValue.to"></copy-icon>
            </div>
            <div class="center-row" v-else>
              <router-link :to="'/address/' + scope.row.parameterValue.to">{{
                scope.row.parameterValue.to
              }}</router-link>
              &nbsp;
              <copy-icon :text="scope.row.parameterValue.to"></copy-icon>
            </div>
          </div>
          <div v-else-if="scope.row.parameterName == 'value'">
            {{ ethers.utils.formatEther(scope.row.parameterValue) }} {{ getUnitDisplay() }}
          </div>
          <div v-else-if="scope.row.parameterName == 'nonce'">
            {{ parseInt(scope.row.parameterValue) }}
          </div>
          <div v-else-if="scope.row.parameterName == 'tokensTransferred'">
            <div :class="scope.row.parameterValue.length >= 6 ? 'rolling' : ''">
              <div v-for="(trans, index) in scope.row.parameterValue" :key="index">
                <div v-if="trans.contractType == 1" class="center-row">
                  <el-icon><CaretRight /></el-icon>
                  <div style="font-weight: bold">From</div>
                  &nbsp;&nbsp;&nbsp;
                  <router-link :to="'/address/' + trans.from">{{ trans.from.slice(0, 18) + '...' }}</router-link>
                  &nbsp;&nbsp;&nbsp;
                  <div style="font-weight: bold">To</div>
                  &nbsp;&nbsp;&nbsp;
                  <router-link :to="'/address/' + trans.to">{{ trans.to.slice(0, 18) + '...' }}</router-link>
                  &nbsp;&nbsp;&nbsp;
                  <span>{{ thousandsFormat(ethers.utils.formatUnits(trans.value, trans.contractDecimals)) }}</span>
                  &nbsp;&nbsp;&nbsp;
                  <router-link :to="'/address/' + trans.contract">
                    <div v-if="trans.contractName">{{ trans.contractName }} ({{ trans.contractSymbol }})</div>
                    <div v-else>
                      {{ trans.contract.slice(0, 18) + '...' }}
                    </div>
                  </router-link>
                </div>
                <div v-else-if="trans.contractType == 2" class="center-row">
                  <el-icon><CaretRight /></el-icon>
                  <div style="font-weight: bold">From</div>
                  &nbsp;&nbsp;&nbsp;
                  <router-link :to="'/address/' + trans.from">{{ trans.from.slice(0, 18) + '...' }}</router-link>
                  &nbsp;&nbsp;&nbsp;
                  <div style="font-weight: bold">To</div>
                  &nbsp;&nbsp;&nbsp;
                  <router-link :to="'/address/' + trans.to">{{ trans.to.slice(0, 18) + '...' }}</router-link>
                  &nbsp;&nbsp;&nbsp;
                  <span style="font-weight: bold">For</span>
                  &nbsp;&nbsp;&nbsp;
                  <span>FRC721 TokenID[{{ parseInt(trans.tokenIDToNums[0].tokenID) }}]</span>
                  &nbsp;&nbsp;&nbsp;
                  <router-link :to="'/address/' + trans.contract">
                    <div v-if="trans.contractName">{{ trans.contractName }} ({{ trans.contractSymbol }})</div>
                    <div v-else>
                      {{ trans.contract.slice(0, 18) + '...' }}
                    </div>
                  </router-link>
                </div>
                <div v-else-if="trans.contractType == 3" class="center-row-erc1155">
                  <div class="center-row-item">
                    <el-icon><CaretRight /></el-icon>
                    <div style="font-weight: bold">From</div>
                    &nbsp;&nbsp;&nbsp;
                    <router-link :to="'/address/' + trans.from">{{ trans.from.slice(0, 18) + '...' }}</router-link>
                    &nbsp;&nbsp;&nbsp;
                    <div style="font-weight: bold">To</div>
                    &nbsp;&nbsp;&nbsp;
                    <router-link :to="'/address/' + trans.to">{{ trans.to.slice(0, 18) + '...' }}</router-link>
                  </div>
                  <div class="center-row-item" v-for="(tokenIDToNum, index) in trans.tokenIDToNums" :key="index">
                    &nbsp;&nbsp;&nbsp;
                    <span>ERC-1155</span>
                    &nbsp;&nbsp;
                    <span style="font-weight: bold">For</span>&nbsp;
                    <span>{{ parseInt(tokenIDToNum.num) }} of Token ID [{{ parseInt(tokenIDToNum.tokenID) }}]</span>
                    &nbsp;&nbsp;
                    <router-link :to="'/address/' + trans.contract">
                      <div v-if="trans.contractName.length != 0">
                        {{ trans.contractName }} ({{ trans.contractSymbol }})
                      </div>
                      <div v-else>
                        {{ trans.contract.slice(0, 18) + '...' }}
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="scope.row.parameterName == 'gas'">
            {{ scope.row.parameterValue.gas }} | {{ scope.row.parameterValue.gasUsed }}
            <!-- {{ scope.row.parameterValue.gas }} | {{ scope.row.parameterValue.gasUsed }} ({{
              scope.row.parameterValue.percent
            }}) -->
          </div>
          <div v-else-if="scope.row.parameterName == 'gasPrice'">
            {{ ethers.utils.formatEther(scope.row.parameterValue) }} {{ getUnitDisplay() }}
          </div>
          <div v-else-if="scope.row.parameterName == 'transactionFee'">
            {{ ethers.utils.formatEther(scope.row.parameterValue) }} {{ getUnitDisplay() }}
          </div>
          <div v-else-if="scope.row.parameterName == 'maxPriorityFeePerGas'">
            Base: {{ ethers.utils.formatEther(scope.row.parameterValue.baseFeePerGas, 'gwei') }} | Max:
            {{ ethers.utils.formatEther(scope.row.parameterValue.maxFeePerGas, 'gwei') }} | MaxPriority:
            {{ ethers.utils.formatEther(scope.row.parameterValue.maxPriorityFeePerGas, 'gwei') }}
          </div>
          <div v-else-if="scope.row.parameterName == 'input'">
            <!-- <textarea
              class="byte-codes-text"
              style="margin: 0px"
              rows="6"
              v-model="scope.row.parameterValue.inputContent"
            >
            </textarea> -->
            <Input-Data-Info
              :inputData="scope.row.parameterValue.inputContent"
              :methodName="scope.row.parameterValue.methodName"
            ></Input-Data-Info>
          </div>
          <div v-else-if="scope.row.parameterName == 'status'">
            <div v-if="scope.row.parameterValue.status == 1">
              <div class="success-status">
                <el-icon color="green"><SuccessFilled /></el-icon> &nbsp; Success
              </div>
            </div>
            <div v-if="scope.row.parameterValue.status == 0">
              <div class="fail-status">
                <el-icon color="red"><Failed /></el-icon> &nbsp; Fail
              </div>
              Fail reason : {{ scope.row.parameterValue.errorMsg }}
            </div>
            <div v-if="scope.row.parameterValue.status == 3">
              <div class="pending-status">
                <el-icon><VideoPause /></el-icon> &nbsp; Pending
              </div>
            </div>
          </div>

          <div v-else>{{ scope.row.parameterValue }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { QuestionFilled, Clock, SuccessFilled, Failed, VideoPause } from '@element-plus/icons-vue';
import { getAge } from '../../script/utils';
import { ethers } from 'ethers';
import { getTitle } from '../../script/global';
import { Overview } from '../../script/model';
import { getUnitDisplay } from '../../script/global';
import { thousandsFormat } from '../../script/utils';
import { CaretRight } from '@element-plus/icons-vue';

document.title = 'Transaction overview | The ' + getTitle() + ' Explorer';

const props = defineProps({
  txOverviews: {
    type: Array as () => Array<Overview>,
    require: true,
  },
});
</script>
<style lang="less" scoped>
@import '../../css/style.css';
.rolling {
  height: 100px;
  overflow: auto;
}
.center-row-erc1155 {
  display: flex;
  flex-direction: column;
}
.center-row-item {
  display: flex;
  align-items: center;
}
</style>
