import { HistoryAction } from './bulk-type-enum';

export interface BulkHistoryRequest {
  startDate: string; 
  endDate: string; 
  bulkType: HistoryAction;
  companyCode: string | null;
  page: number | null;
  rows: number | null;
}

export const bulkHistoryRequest = (reqBody: {
  startDate: string;
  endDate: string;
  bulkType?: HistoryAction;
  companyCode?: string;
  page?: number;
  rows?: number;
}): BulkHistoryRequest => ({
  startDate: reqBody.startDate,
  endDate: reqBody.endDate,
  bulkType: reqBody.bulkType,
  companyCode: reqBody.companyCode ? reqBody.companyCode : null,
  page: reqBody.page,
  rows: reqBody.rows,
});
