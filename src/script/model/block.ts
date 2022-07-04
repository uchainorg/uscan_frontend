/**
 * Block
 * @class
 */
class BlockDetail {
  id: number;
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
  /**
   * Create a block.
   * @param {number} id
   * @param {string} baseFeePerGas
   * @param {string} difficulty,
   * @param {string} extraData,
   * @param {number} gasLimit,
   * @param {number} gasUsed,
   * @param {string} hash,
   * @param {string} logsBloom,
   * @param {string} miner,
   * @param {string} mixHash,
   * @param {number} nonce,
   * @param {string} parentHash,
   * @param {string} receiptsRoot,
   * @param {string} sha3Uncles,
   * @param {string} size,
   * @param {string} stateRoot,
   * @param {number} timestamp,
   * @param {number} totalDifficulty,
   * @param {string[]} transactions,
   * @param {number} transactionsTotal,
   * @param {string} transactionsRoot,
   * @param {number} createdTime
   */
  constructor(
    id: number,
    baseFeePerGas: string,
    difficulty: string,
    extraData: string,
    gasLimit: number,
    gasUsed: number,
    hash: string,
    logsBloom: string,
    miner: string,
    mixHash: string,
    nonce: number,
    parentHash: string,
    receiptsRoot: string,
    sha3Uncles: string,
    size: string,
    stateRoot: string,
    timestamp: number,
    totalDifficulty: number,
    transactions: string[],
    transactionsTotal: number,
    transactionsRoot: string,
    createdTime: number
  ) {
    (this.id = id),
      (this.baseFeePerGas = baseFeePerGas),
      (this.difficulty = difficulty),
      (this.extraData = extraData),
      (this.gasLimit = gasLimit),
      (this.gasUsed = gasUsed),
      (this.hash = hash),
      (this.logsBloom = logsBloom),
      (this.miner = miner),
      (this.mixHash = mixHash),
      (this.nonce = nonce),
      (this.parentHash = parentHash),
      (this.receiptsRoot = receiptsRoot),
      (this.sha3Uncles = sha3Uncles),
      (this.size = size),
      (this.stateRoot = stateRoot),
      (this.timestamp = timestamp),
      (this.totalDifficulty = totalDifficulty),
      (this.transactions = transactions),
      (this.transactionsTotal = transactionsTotal),
      (this.transactionsRoot = transactionsRoot),
      (this.createdTime = createdTime);
  }
}

export { BlockDetail };
