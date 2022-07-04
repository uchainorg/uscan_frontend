/**
 * Transaction
 * @class
 */
class TransactionDetail {
  hash: string;
  method: string;
  blockHash: string;
  blockNumber: string;
  from: string;
  fromName: string;
  fromSymbol: string;
  to: string;
  toName: string;
  toCode: string;
  gas: string;
  value: string;
  createTime: number;
  /**
   * Create a Transaction.
   * @param {string} hash,
   * @param {string} method,
   * @param {string} blockHash:,
   * @param {string} blockNumber:,
   * @param {string} from,
   * @param {string} fromName,
   * @param {string}fromSymbol,
   * @param {string}to,
   * @param {string}toName,
   * @param {string}toCode,
   * @param {string}gas,
   * @param {string}value,
   * @param {number}createTime
   */
  constructor(
    hash: string,
    method: string,
    blockHash: string,
    blockNumber: string,
    from: string,
    fromName: string,
    fromSymbol: string,
    to: string,
    toName: string,
    toCode: string,
    gas: string,
    value: string,
    createTime: number
  ) {
    (this.hash = hash), (this.method = method), (this.blockHash = blockHash), (this.blockNumber = blockNumber);
    this.from = from;
    this.fromName = fromName;
    this.fromSymbol = fromSymbol;
    this.to = to;
    this.toName = toName;
    this.toCode = toCode;
    this.gas = gas;
    this.value = value;
    this.createTime = createTime;
  }
}

export { TransactionDetail };
