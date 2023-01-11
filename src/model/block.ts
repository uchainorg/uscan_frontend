import { formatNumber } from '@/utils/utils';
import { TableHeader } from '@/model/index';
import { Overview } from '@/model/index';

export interface BlockDetail {
  id: number;
  number: string;
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: number;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: number;
  totalDifficulty: number;
  transactions: string[];
  transactionsTotal: number;
  transactionsRoot: string;
  createdTime: number;
}

export const getBlockOverviews = function (block: BlockDetail): Overview[] {
  // console.log(block);
  const blockParameterMap = new Map();
  blockParameterMap.set('number', [
    'Block Height',
    // eslint-disable-next-line max-len
    'Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block.',
  ]);
  blockParameterMap.set('timestamp', ['Timestamp', 'The date and time at which a block is mined.']);
  blockParameterMap.set('transactionsTotal', [
    'Transactions',
    // eslint-disable-next-line max-len
    'The number of transactions in the block. Internal transaction is transactions as a result of contract execution that involves Ether value.',
  ]);
  blockParameterMap.set('miner', ['Mined by', 'Miner who successfully include the block onto the blockchain.']);
  blockParameterMap.set('difficulty', [
    'Difficulty',
    'The amount of effort required to mine a new block. The difficulty algorithm may adjust according to time.',
  ]);
  blockParameterMap.set('totalDifficulty', ['Total Difficulty', 'Total difficulty of the chain until this block.']);
  blockParameterMap.set('size', ['Size', 'The block size is actually determined by the block gas limit.']);
  blockParameterMap.set('gasUsed', [
    'Gas Used',
    'The total gas used in the block and its percentage of gas filled in the block.',
  ]);
  blockParameterMap.set('gasLimit', ['Gas Limit', 'Total gas limit provided by all transactions in the block.']);
  blockParameterMap.set('extraData', ['Extra Data', 'Any data that can be included by the miner in the block.']);
  blockParameterMap.set('hash', ['Hash', 'The hash of the block header of the current block.']);
  blockParameterMap.set('parentHash', [
    'Parent Hash',
    'The hash of the block from which this block was generated, also known as its parent block.',
  ]);
  blockParameterMap.set('sha3Uncles', [
    'Sha3Uncles',
    'The mechanism which Ethereum Javascript RLP encodes an empty string.',
  ]);
  blockParameterMap.set('stateRoot', ['StateRoot', 'The root of the state trie.']);
  blockParameterMap.set('nonce', [
    'Nonce',
    'Block nonce is a value used during mining to demonstrate proof of work for a block.',
  ]);
  const resList: Overview[] = [];
  for (const [key, value] of blockParameterMap) {
    let valueDisplay: string = block[key as keyof BlockDetail] as string;
    if (key == 'number') {
      valueDisplay = parseInt(valueDisplay).toString();
    } else if (key == 'difficulty') {
      valueDisplay = formatNumber(BigInt(parseInt(valueDisplay)));
    } else if (key == 'totalDifficulty') {
      valueDisplay = formatNumber(BigInt(parseInt(valueDisplay)));
    } else if (key == 'size') {
      valueDisplay = formatNumber(parseInt(valueDisplay)) + ' bytes';
    } else if (key == 'gasUsed') {
      valueDisplay = formatNumber(parseInt(valueDisplay));
    } else if (key == 'gasLimit') {
      valueDisplay = formatNumber(parseInt(valueDisplay));
    }
    resList.push({
      parameterName: key,
      parameterDisplay: value[0] + ':',
      parameterValue: valueDisplay,
      parameterExplain: value[1],
    });
  }
  return resList;
};

export const BlocksHeaderList: TableHeader[] = [
  { label: 'Block', key: 'number' },
  { label: 'Age', key: 'timestamp' },
  { label: 'Txn', key: 'transactionsTotal' },
  { label: 'Miner', key: 'miner' },
  { label: 'Gas Used', key: 'gasUsed' },
  { label: 'Gas Limit', key: 'gasLimit' },
  { label: 'Base Fee', key: 'baseFeePerGas' },
];
