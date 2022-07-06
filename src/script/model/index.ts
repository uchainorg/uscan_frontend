import { BlockDetail } from './block';
import { TransactionDetail } from './transaction';
export interface ResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}

export interface BlocksResponse {
  items: BlockDetail[];
  total: number;
}

export interface TransactionsResponse {
  items: TransactionDetail[];
  total: number;
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
