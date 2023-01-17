import { BlockDetail } from './block';
import { TransactionDetail, TransactionLog, InternalTransactionDetail, TransactionCount } from './transaction';
import { TokenHolder, TokenInventoryHolder } from './token';
import { ContractContent } from './contract';

export interface ContractsResponse {
  items: ContractContent[];
  total: number;
}

export interface ResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}

export interface BlocksResponse {
  items: BlockDetail[];
  total: number;
}

export interface TransactionLogResponse {
  items: TransactionLog[];
  total: number;
}

export interface TransactionsResponse {
  items: TransactionDetail[];
  total: number;
}

export interface InternalTransactionsResponse {
  items: InternalTransactionDetail[];
  total: number;
}

export interface TokenHoldersResponse {
  items: TokenHolder[];
  total: number;
}

export interface GethDebugTraceResponse {
  logNum: number;
  transactionHash: string;
  res: string;
}

export interface TokenResponse {
  items: TokenInventoryHolder[];
  total: number;
}

export interface TotalResponse {
  data: TransactionCount[];
  type: any;
}

/**
 * List Header
 * @class
 */
export class TableHeader {
  label: string;
  key: string;
  /**
   * Create a Overview.
   * @param {string} label
   * @param {string} key
   */
  constructor(label: string, key: string) {
    this.label = label;
    this.key = key;
  }
}

/**
 * Overview
 * @class
 */
export class Overview {
  parameterName: string;
  parameterDisplay: string;
  parameterValue: string;
  parameterExplain: string;
  /**
   * Create a Overview.
   * @param {string} parameterName
   * @param {string} parameterDisplay
   * @param {string} parameterValue
   * @param {string} parameterExplain
   */
  constructor(parameterName: string, parameterDisplay: string, parameterValue: string, parameterExplain: string) {
    this.parameterName = parameterName;
    this.parameterDisplay = parameterDisplay;
    this.parameterValue = parameterValue;
    this.parameterExplain = parameterExplain;
  }
}

export interface ContractContentRes {
  contract: ContractContent;
  proxyContract: ContractContent;
  proxyContractAddress: string;
}

export interface CustomParams {
  appTitle: string;
  nodeUrl: string;
  unitDisplay: string;
  chainID: number;
  decimal: number;
}
