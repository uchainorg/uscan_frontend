import { BlockDetail } from '@/model/block';
import { DailyTransactionCount, TransactionDetail, TransactionOverview } from '@/model/transaction';

export interface HomePageInfo {
  blocks: BlockDetail[];
  txs: TransactionDetail[];
  metrics: TransactionOverview;
  dateTxs: DailyTransactionCount[];
}
