/**
 * TokenTransfers
 * @class
 */
export class TokenTransfers {
  erc1155: number;
  erc20: number;
  erc721: number;
  /**
   * Create a block.
   * @param {number} erc1155
   * @param {number} erc20
   * @param {number} erc721
   */
  constructor(erc1155: number, erc20: number, erc721: number) {
    this.erc1155 = erc1155;
    this.erc20 = erc20;
    this.erc721 = erc721;
  }
}

/**
 * TokenHolder
 * @class
 */
export class TokenHolder {
  owner: string;
  contract: string;
  quantity: string;
  createdTime: number;
  /**
   * Create a block.
   * @param {string} owner
   * @param {string} contract
   * @param {string} quantity
   * @param {number} createdTime
   */
  constructor(owner: string, contract: string, quantity: string, createdTime: number) {
    this.owner = owner;
    this.contract = contract;
    this.quantity = quantity;
    this.createdTime = createdTime;
  }
}
