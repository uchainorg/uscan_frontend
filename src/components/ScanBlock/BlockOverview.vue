<template lang="">
  <el-table :data="tableData" style="width: 100%; margin-top: -3%">
    <el-table-column prop="parameterDisplay" width="350px"></el-table-column>
    <el-table-column prop="parameterValue">
      <template v-slot:default="scope">
        <div v-if="scope.row.parameterName == 'blockHeight'">blockHeight {{ scope.row.parameterValue }}</div>
        <div v-else-if="scope.row.parameterName == 'timestamp'">time {{ scope.row.parameterValue }}</div>
        <div v-else>
          {{ scope.row.parameterValue }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "BlockOverview",
  props: ["data"],
  data() {
    return {
      tableData: [
        {
          parameterName: "blockHeight",
          parameterDisplay: "Block Height:",
          parameterValue: "14660757",
        },
        {
          parameterName: "timestamp",
          parameterDisplay: "Timestamp:",
          parameterValue: "1 day 10 hrs ago (Apr-26-2022 02:48:48 PM +UTC)",
        },
        {
          parameterName: "transactions",
          parameterDisplay: "Transactions:",
          parameterValue: "308 transactions and 70 contract internal transactions in this block",
        },
        {
          parameterName: "minedBy",
          parameterDisplay: "Mined by:",
          parameterValue: "0x00192fb10df37c9fb26829eb2cc623cd1bf599e8 (2Miners: PPLNS) in 65 secs",
        },
        {
          parameterName: "blockReward",
          parameterDisplay: "Block Reward:",
          parameterValue: "2.058262409143852486 Ether (2 + 1.325123428079492042 - 1.266861018935639556)",
        },
        {
          parameterName: "blockReward",
          parameterDisplay: "Block Reward:",
          parameterValue: "2.058262409143852486 Ether (2 + 1.325123428079492042 - 1.266861018935639556)",
        },
        {
          parameterName: "unclesReward",
          parameterDisplay: "Uncles Reward:",
          parameterValue: "0",
        },
        {
          parameterName: "difficulty",
          parameterDisplay: "Difficulty:",
          parameterValue: "13,173,991,395,647,696",
        },
        {
          parameterName: "totalDifficulty",
          parameterDisplay: "Total Difficulty:",
          parameterValue: "13,173,991,395,647,696",
        },
        {
          parameterName: "size",
          parameterDisplay: "Size:",
          parameterValue: "137,666 bytes",
        },
        {
          parameterName: "gasUsed",
          parameterDisplay: "Gas Used:",
          parameterValue: "19,182,321 (64.00%)",
        },
        {
          parameterName: "gasUsed",
          parameterDisplay: "Gas Used:",
          parameterValue: "29,970,647",
        },
        {
          parameterName: "baseFeePerGas:",
          parameterDisplay: "Base Fee Per Gas:",
          parameterValue: "0.000000066043156036 Ether (66.043156036 Gwei)",
        },
        {
          parameterName: "burntFees",
          parameterDisplay: "Burnt Fees:",
          parameterValue: "1.266861018935639556 Ether",
        },
        {
          parameterName: "extraData",
          parameterDisplay: "Extra Data:",
          parameterValue: "EthereumPPLNS/2miners_ASIA2 (Hex:0x457468657265756d50504c4e532f326d696e6572735f4153494132)",
        },
        {
          parameterName: "etherPrice:",
          parameterDisplay: "Ether Price:",
          parameterValue: "$2,809.60 / ETH",
        },
        {
          parameterName: "hash",
          parameterDisplay: "Hash:",
          parameterValue: "0xa36593f9ff209a1eb668da6b6b3a996d63ea3b7105cd1ff1829d1f296ec47930",
        },
        {
          parameterName: "parentHash",
          parameterDisplay: "Parent Hash:",
          parameterValue: "0x9c0831353cd9bee917db6a1893d4db6b81998401203045ff9a653973089a6801",
        },
        {
          parameterName: "sha3Uncles",
          parameterDisplay: "Sha3Uncles:",
          parameterValue: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        },

        {
          parameterName: "stateRoot",
          parameterDisplay: "StateRoot:",
          parameterValue: "0x4b726b531b15c7181eb65721b9647b9fdf4c270807ab4a06db346435209e53bf",
        },
        {
          parameterName: "nonce",
          parameterDisplay: "Nonce:",
          parameterValue: "0x4a07d5fb923fdc52",
        },
      ],
    };
  },
};
</script>
<style lang=""></style>
