import {Dictionary} from "./dictionary";

export interface DictionaryColumn {
  id?: string
  dictionaryId: string
  name: string
  type: string
  primaryKey: 1 | 0 | boolean
  notNull: 1 | 0 | boolean
}

export interface DictionaryDetail {
  dictionary:Dictionary
  detail: Detail
}

interface Detail{
  data:any[]
  columns:any[]
}
