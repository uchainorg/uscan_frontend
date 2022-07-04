/**
 * Block
 * @class
 */
class Block {
  blockNumber: number;
  createTimeStamp: number;
  txn: number;
  gasUsed: number;
  gasLimit: number;
  miner: string;

  /**
   * Create a point.
   * @param {number} blockNumberArg
   * @param {number} createTimeStampArg
   * @param {number} txnArg
   * @param {number} gasUsedArg
   * @param {number} gasLimitArg
   * @param {string} minerArg
   */
  constructor(
    blockNumberArg: number,
    createTimeStampArg: number,
    txnArg: number,
    gasUsedArg: number,
    gasLimitArg: number,
    minerArg: string
  ) {
    this.blockNumber = blockNumberArg;
    this.createTimeStamp = createTimeStampArg;
    this.txn = txnArg;
    this.gasUsed = gasUsedArg;
    this.gasLimit = gasLimitArg;
    this.miner = minerArg;
  }
}

export default { Block };
