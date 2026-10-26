export interface CorrectionHistoryRequest {
  startDate: string; 
  endDate: string; 
  page: number | null;
  rows: number | null;
}

export const bulkHistoryRequest = (reqBody: {
  startDate: string;
  endDate: string;
  page?: number;
  rows?: number;
}): CorrectionHistoryRequest => ({
  startDate: reqBody.startDate,
  endDate: reqBody.endDate,

  page: reqBody.page,
  rows: reqBody.rows,
});
