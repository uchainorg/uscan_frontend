<template lang="">
  <div>
    <div class="center-row" style="font-size: 13px">
      <el-icon><Document /></el-icon>&nbsp;
      <p>Write Contract Information</p>
    </div>
    <p>
      The MetaMask wallet will be automatically connected, please make sure it is installed and in the correct network.
    </p>
    <div v-for="(functionObject, index) in functionObjectList" :key="index">
      <el-collapse class="method-content" v-model="activeNames">
        <el-collapse-item
          class="method-object"
          :title="'&nbsp;&nbsp;&nbsp;&nbsp;' + (index + 1) + '.' + functionObject.name"
          :name="index"
        >
          <div style="padding-right: 1rem; padding-left: 1rem">
            <div v-for="(input, inputIndex) in functionObject.inputsArg" :key="inputIndex">
              <div style="margin-top: 0.8rem">
                <div style="font-size: 9px">{{ input.name + '(' + input.internalType + ')' }}</div>
                <el-input v-model="input.arg" :placeholder="input.name + '(' + input.internalType + ')'" />
              </div>
            </div>
            <div style="margin-top: 0.8rem" v-if="functionObject.inputsArg.length != 0">
              <el-button type="info" plain @click="write(functionObject)">Write</el-button>
            </div>
            <div style="margin-top: 0.8rem">
              <div v-for="(output, index) in functionObject.outputsRes" :key="index">
                <div class="method-output">
                  <div>{{ output.arg }}</div>
                  &nbsp;&nbsp;
                  <div class="arg-type">{{ output.internalType }}</div>
                </div>
              </div>
            </div>
            <div v-if="functionObject.resMsg != ''">
              <p>{{ functionObject.resMsg }}</p>
            </div>
            <div v-if="functionObject.errMsg != ''">
              <p style="color: red">{{ functionObject.errMsg }}</p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { ContractContent } from '../../../script/model/contract';
import { Document } from '@element-plus/icons-vue';
import { ethers } from 'ethers';
import { getChainID, getTitle, getUnitDisplay, getNodeUrl, getDecimals } from '../../../script/global';

const props = defineProps({
  contractAddress: String,
  contractInfo: {
    type: Object as () => ContractContent,
  },
});

const functionObjectList = reactive([] as any[]);

const activeNames = ref([] as number[]);

const chainId = getChainID();
const chainName = getTitle();
const symbol = getUnitDisplay();
const decimals = getDecimals();
const nodeUrl = getNodeUrl();

const functionResMap = new Map();

const abi = (props.contractInfo as unknown as ContractContent).abi as string;

const initData = () => {
  if (Object.keys(props.contractInfo as ContractContent).length !== 0) {
    activeNames.value = [];
    let index = 0;
    JSON.parse(abi).forEach((elementFunc: any) => {
      if (elementFunc.stateMutability == 'nonpayable' && elementFunc.type == 'function') {
        // console.log('elementFunc', elementFunc);
        const inputsArg: any[] = [];
        if (elementFunc.inputs) {
          if (elementFunc.inputs.length != 0) {
            elementFunc.inputs.forEach((element: any) => {
              inputsArg.push({
                arg: '',
                name: element.name,
                internalType: element.type,
              });
            });
          }
        }
        const outputsRes: any[] = [];
        if (elementFunc.outputs) {
          if (elementFunc.outputs.length != 0) {
            elementFunc.outputs.forEach((element: any) => {
              outputsRes.push({
                arg: '',
                name: element.name,
                internalType: element.type,
              });
            });
          }
        }
        const functionObject = {
          name: elementFunc.name,
          inputs: elementFunc.inputs,
          inputsArg: inputsArg,
          outputs: elementFunc.outputs,
          outputsRes: outputsRes,
          resMsg: '',
          errMsg: '',
        };
        functionObjectList.push(functionObject);
        functionResMap.set(index, functionObject);
        index += 1;
      }
    });
    activeNames.value = Array.from(new Array(functionObjectList.length).keys());
  }
};

onMounted(async () => {
  initData();
});

const write = async (functionObject: any) => {
  // console.log(functionObject);
  if (JSON.parse(abi).length != 0) {
    const chainIdFromWallet = (window as any).ethereum.networkVersion;
    console.log('chainIdFromWallet', chainIdFromWallet);
    console.log('chainId', chainId);
    if (chainIdFromWallet != chainId) {
      // alert('Please switch to the correct network in your wallet(Metamask)');
      // return;

      console.log('params', chainName, symbol, decimals, nodeUrl);

      // (window as any).ethereum
      //   .request({
      //     method: 'wallet_addEthereumChain',
      //     params: [
      //       {
      //         chainId: '0x' + chainId.toString(16),
      //         chainName: chainName,
      //         nativeCurrency: {
      //           name: chainName,
      //           symbol: symbol,
      //           decimals: decimals,
      //         },
      //         rpcUrls: [nodeUrl],
      //       },
      //     ],
      //   })
      //   .catch((error: any) => {
      //     console.log(error);
      //   });

      await (window as any).ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x' + chainId.toString(16),
            },
          ],
        })
        .then(() => {
          return;
        })
        .catch((e: any) => {
          alert('Switch Chain error:', e);
          console.log('wallet_switchEthereumChain error: ', e);
          return;
        })
        .finally(() => {});
    }

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    if ((window as any).ethereum._state.accounts.length == 0) {
      await provider.send('eth_requestAccounts', []);
    }
    const signer = provider.getSigner();
    const contract = new ethers.Contract(props.contractAddress as string, abi, provider);
    const contractWithSigner = contract.connect(signer);
    Reflect.ownKeys(contractWithSigner.functions).forEach(async function (key) {
      if (key == functionObject.name) {
        const requestArgList: any[] = [];
        functionObject.inputsArg.forEach((element: any) => {
          requestArgList.push(element.arg);
        });
        try {
          const tx = await contractWithSigner.functions[key as string](...requestArgList);
          functionObject.resMsg = 'Write success, please wait for confirmation';
          console.log(tx);
        } catch (err: any) {
          console.log('err', err.reason);
          functionObject.errMsg = err.reason;
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
@import '../../../css/style.css';
</style>
