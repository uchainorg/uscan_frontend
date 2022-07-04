import { BlockDetail } from './block';
import { TransactionDetail } from './transaction';

interface ResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}

interface BlocksResponse {
  items: BlockDetail[];
  total: number;
}

interface TransactionsResponse {
  items: TransactionDetail[];
  total: number;
}

export type { ResponseType, BlocksResponse, TransactionsResponse };
