import { formatNumber } from '@/utils/utils';
import { TableHeader } from '@/model/index';
import { Overview } from '@/model/index';

export interface DailyTransactionCount {
  date: string;
  txCount: string;
}

export interface TransactionOverview {
  address: number;
  avgBlockTime: number;
  block: number;
  blockHeight: number;
  dailyTx: number;
  diff: number;
  tps: number;
  tx: number;
  erc20: number;
  erc721: number;
  erc1155: number;
}

export interface TokensTransferred {
  from: string;
  fromHex: string;
  to: string;
  toHex: string;
  address: string;
  addressName: string;
  addressSymbol: string;
}

export interface TransactionLog {
  id: string;
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  removed: boolean;
  createdTime: number;
}

export interface TransactionDetail {
  hash: string;
  method: string;
  blockHash: string;
  blockNumber: string;
  from: string;
  fromName: string;
  fromSymbol: string;
  fromCode: string;
  to: string;
  toName: string;
  toSymbol: string;
  toCode: string;
  gas: string;
  gasPrice: number;
  value: string;
  createTime: number;
  createdTime: number;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  input: string;
  nonce: number;
  transactionIndex: string;
  type: string;
  chainID: string;
  v: string;
  r: string;
  s: string;
  totalLogs: number;
  tokensTransferred: TokensTransferred[];
  baseFeePerGas: string;
  gasLimit: number;
  contractAddress: string;
  contractAddressName: string;
  contractAddressSymbol: string;
  cumulativeGasUsed: number;
  effectiveGasPrice: string;
  gasUsed: number;
  root: string;
  errorReturn: string;
  status: number;
  tokenID: number;
  transactionHash: string;
  baseInfo: boolean;
  methodName: string;
  logs: TransactionLog[];
  fromContract: boolean;
  toContract: boolean;
}

export interface InternalTransactionDetail {
  transactionHash: string;
  blockNumber: string;
  status: number;
  callType: string;
  depth: string;
  from: string;
  to: string;
  amount: string;
  gasLimit: string;
  createdTime: number;
}

export interface GethDebugTrace {
  pc: string;
  op: string;
  gas: string;
  gasCost: number;
  depth: number;
}

export interface TransactionCount {
  TxCount: number;
  Erc20Tx: number;
  Erc721Tx: number;
  AvgDifficulty: number;
  Difficult: number;
  BlockCount: number;
  Date: string;
}

export interface DailyTransactionCount {
  date: string;
  txCount: string;
}

export interface TransactionOverview {
  address: number;
  avgBlockTime: number;
  block: number;
  blockHeight: number;
  dailyTx: number;
  diff: number;
  tps: number;
  tx: number;
  erc20: number;
  erc721: number;
  erc1155: number;
}

export const getTxOverviews = function (tx: TransactionDetail): Overview[] {
  const txParameterMap = new Map();
  txParameterMap.set('hash', [
    'Transaction Hash',
    // eslint-disable-next-line max-len
    'A TxHash or transaction hash is a unique 66-character identifier that is generated whenever a transaction is executed.',
  ]);
  txParameterMap.set('status', ['Status', 'The status of the transaction.']);
  txParameterMap.set('blockNumber', [
    'Block',
    // eslint-disable-next-line max-len
    'Number of the block in which the transaction is recorded. Block confirmations indicate how many blocks have been added since the transaction was mined.',
  ]);
  txParameterMap.set('createTime', ['Timestamp', 'The date and time at which a transaction is mined.']);
  txParameterMap.set('createdTime', ['Timestamp', 'The date and time at which a transaction is mined.']);
  txParameterMap.set('from', ['From', 'The sending party of the transaction.']);
  txParameterMap.set('to', ['To', 'The receiving party of the transaction (could be a contract address).']);
  txParameterMap.set('value', [
    'Value',
    // eslint-disable-next-line max-len
    'The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction.',
  ]);
  txParameterMap.set('gasPrice', [
    'Gas Price',
    // eslint-disable-next-line max-len
    'Cost per unit of gas specified for the transaction, in Ether and Gwei. The higher the gas price the higher chance of getting included in a block.',
  ]);
  txParameterMap.set('gas', [
    'Gas Limit & Usage by Txn',
    // eslint-disable-next-line max-len
    'Maximum amount of gas allocated for the transaction & the amount eventually used. Normal ETH transfers involve " + res.gasLimit + " gas units while contracts involve higher values.',
  ]);
  if (parseInt(tx.baseFeePerGas) !== 0) {
    txParameterMap.set('maxPriorityFeePerGas', ['Gas Fees', 'The amount eventually used.']);
  }
  txParameterMap.set('nonce', [
    'Nonce',
    // eslint-disable-next-line max-len
    'Sequential running number for an address, beginning with 0 for the first transaction. For example, if the nonce of a transaction is 10, it would be the 11th transaction sent from the senders address.',
  ]);
  txParameterMap.set('tokensTransferred', ['Tokens Transferred', 'List of tokens transferred in the transaction.']);
  txParameterMap.set('input', [
    'Input Data',
    // eslint-disable-next-line max-len
    'Additional data included for this transaction. Commonly used as part of contract interaction or as a message sent to the recipient.',
  ]);
  const resList: Overview[] = [];
  for (const [key, value] of txParameterMap) {
    let valueDisplay: any = tx[key as keyof TransactionDetail] as string;
    if (valueDisplay === undefined || valueDisplay === null || valueDisplay.length === 0) {
      if (key !== 'to') {
        continue;
      }
    }
    // console.log('key', key, 'value', valueDisplay);
    if (key == 'from') {
      valueDisplay = {
        from: tx.from,
        fromCode: tx.fromCode,
        fromName: tx.fromName,
        fromSymbol: tx.fromSymbol,
        fromContract: tx.fromContract,
      };
    } else if (key == 'to') {
      valueDisplay = {
        to: tx.to,
        toCode: tx.toCode,
        toName: tx.toName,
        toSymbol: tx.toSymbol,
        contractAddress: tx.contractAddress,
        contractAddressName: tx.contractAddressName,
        contractAddressSymbol: tx.contractAddressSymbol,
        toContract: tx.toContract,
        method: tx.method,
      };
    } else if (key == 'gas') {
      valueDisplay = {
        gas: formatNumber(BigInt(tx.gas)),
        gasUsed: formatNumber(BigInt(tx.gasUsed)),
      };
    } else if (key == 'maxPriorityFeePerGas') {
      valueDisplay = {
        baseFeePerGas: tx.baseFeePerGas,
        maxFeePerGas: tx.maxFeePerGas,
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
      };
    } else if (key == 'status') {
      valueDisplay = {
        status: tx.status,
        errorMsg: tx.errorReturn,
      };
    } else if (key == 'input') {
      valueDisplay = {
        inputContent: tx.input,
        methodName: tx.methodName,
      };
    }
    resList.push({
      parameterName: key,
      parameterDisplay: value[0] + ':',
      parameterValue: valueDisplay,
      parameterExplain: value[1],
    });
  }

  resList.splice(7, 0, {
    parameterName: 'transactionFee',
    parameterDisplay: 'Transaction Fee:',
    parameterValue: (tx.gasPrice * tx.gasUsed) as unknown as string,
    parameterExplain: 'Amount paid to the miner for processing the transaction',
  });

  return resList;
};

export const TransactionsHeaderList: TableHeader[] = [
  { label: 'Txn Hash', key: 'hash' },
  { label: 'Method', key: 'method' },
  { label: 'Block', key: 'blockNumber' },
  { label: 'Age', key: 'createTime' },
  { label: 'From', key: 'from' },
  { label: 'To', key: 'to' },
  { label: 'Value', key: 'value' },
  { label: 'Txn Fee', key: 'gas' },
];

export const Erc20TransactionsHeaderList: TableHeader[] = [
  { label: 'Txn Hash', key: 'transactionHash' },
  { label: 'Method', key: 'method' },
  { label: 'Block', key: 'blockNumber' },
  { label: 'Age', key: 'createdTime' },
  { label: 'From', key: 'from' },
  { label: 'To', key: 'to' },
  { label: 'Value', key: 'value' },
  { label: 'Token', key: 'contract' },
];

export const Erc721TransactionsHeaderList: TableHeader[] = [
  { label: 'Txn Hash', key: 'transactionHash' },
  { label: 'Method', key: 'method' },
  { label: 'Block', key: 'blockNumber' },
  { label: 'Age', key: 'createdTime' },
  { label: 'From', key: 'from' },
  { label: 'To', key: 'to' },
  { label: 'TokenID', key: 'tokenID' },
  { label: 'Token', key: 'contract' },
];

export const Erc1155TransactionsHeaderList: TableHeader[] = [
  { label: 'Txn Hash', key: 'transactionHash' },
  { label: 'Method', key: 'method' },
  { label: 'Block', key: 'blockNumber' },
  { label: 'Age', key: 'createdTime' },
  { label: 'From', key: 'from' },
  { label: 'To', key: 'to' },
  { label: 'TokenID', key: 'tokenID' },
  { label: 'Quantity', key: 'value' },
  { label: 'Token', key: 'contract' },
];

export const InternalTransactionsHeaderList: TableHeader[] = [
  { label: 'Parent Txn Hash', key: 'transactionHash' },
  { label: 'Block', key: 'blockNumber' },
  { label: 'Age', key: 'createdTime' },
  { label: 'From', key: 'from' },
  { label: 'To', key: 'to' },
  { label: 'Value', key: 'amount' },
];

export const TokenErc20TransactionsHeaderList: TableHeader[] = [
  { label: 'Txn Hash', key: 'transactionHash' },
  { label: 'Method', key: 'method' },
  { label: 'Block', key: 'blockNumber' },
  { label: 'Age', key: 'createdTime' },
  { label: 'From', key: 'from' },
  { label: 'To', key: 'to' },
  { label: 'Quantity', key: 'value' },
];

export const TokenErcTransactionsHeaderList: TableHeader[] = [
  { label: 'Txn Hash', key: 'transactionHash' },
  { label: 'Method', key: 'method' },
  { label: 'Block', key: 'blockNumber' },
  { label: 'Age', key: 'createdTime' },
  { label: 'From', key: 'from' },
  { label: 'To', key: 'to' },
  { label: 'TokenID', key: 'tokenID' },
];

export const TokeHolderHeaderList: TableHeader[] = [
  { label: 'Rank', key: 'rank' },
  { label: 'Address', key: 'Address' },
  { label: 'Quantity', key: 'Quantity' },
  { label: 'Percentage', key: 'percentage' },
];

export const TokeErcHolderHeaderList: TableHeader[] = [
  { label: 'Address', key: 'owner' },
  { label: 'token', key: 'tokenID' },
];
