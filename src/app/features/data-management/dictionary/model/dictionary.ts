export interface Dictionary {
  id?: string
  name: string
  tableName: string
  tableColumns: TableColumn[]
  description: string
  type: "INTERNAL" | "EXTERNAL" | "CALCULATION"
}

export interface TableColumn{
  id:string
  dictionaryId:string
  name:string
  type:string
  primaryKey:boolean
  notNull:boolean
}

export interface PreviewQuery {
  data: any[]
  columns: any[]
}
