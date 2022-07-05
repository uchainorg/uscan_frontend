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
