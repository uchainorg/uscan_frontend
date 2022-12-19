/**
 * AddressDetail
 * @class
 */
export class AddressDetail {
  id: number;
  owner: string;
  balance: string;
  blockNumber: string;
  creator: string;
  txHash: string;
  code: string;
  name: string;
  symbol: string;
  tokenTotalSupply: number;
  nftTotalSupply: number;
  decimals: number;
  createdTime: number;
  erc20: boolean;
  erc721: boolean;
  erc1155: boolean;
  /**
   * Create a AddressDetail.
   * @param {number} id
   * @param {string} owner
   * @param {string} balance
   * @param {string} blockNumber
   * @param {string} creator
   * @param {string} txHash
   * @param {string} code
   * @param {string} name
   * @param {string} symbol
   * @param {number} tokenTotalSupply
   * @param {number} nftTotalSupply
   * @param {number} decimals
   * @param {string} createdTime
   * @param {boolean} erc20
   * @param {boolean} erc721
   * @param {boolean} erc1155
   */
  constructor(
    id: number,
    owner: string,
    balance: string,
    blockNumber: string,
    creator: string,
    txHash: string,
    code: string,
    name: string,
    symbol: string,
    tokenTotalSupply: number,
    nftTotalSupply: number,
    decimals: number,
    createdTime: number,
    erc20: boolean,
    erc721: boolean,
    erc1155: boolean
  ) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
    this.blockNumber = blockNumber;
    this.creator = creator;
    this.txHash = txHash;
    this.code = code;
    this.name = name;
    this.symbol = symbol;
    this.tokenTotalSupply = tokenTotalSupply;
    this.nftTotalSupply = nftTotalSupply;
    this.decimals = decimals;
    this.createdTime = createdTime;
    this.erc20 = erc20;
    this.erc721 = erc721;
    this.erc1155 = erc1155;
  }
}

export interface AddressTxsTotal {
  erc1155Total: string;
  erc20Total: string;
  erc721Total: string;
  internalTotal: string;
  txTotal: string;
}
