import { BlockDetail } from './block';
import { DailyTransactionCount, TransactionDetail, TransactionOverview } from './transaction';

export interface HomePageInfo {
    blocks: BlockDetail[];
    txs: TransactionDetail[];
    metrics: TransactionOverview;
    dateTxs: DailyTransactionCount[];
}
