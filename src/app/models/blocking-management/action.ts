
export interface blockingPolicy  {
  id : string
  priority : number,
  description : string,
  enable : boolean,
  formula : string,
  id_action : string,
  action : string,
  created_date : string | null,
  updated_date : string | null,
  isNew: boolean,
  isModified: boolean,
  isDeleted: boolean,
}
