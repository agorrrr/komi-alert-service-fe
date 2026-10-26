
export enum FieldType {
  DROPDOWN = 'DROPDOWN',
  CALENDAR = 'CALENDAR',
  INPUTTEXT = 'INPUTTEXT',
  
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType; 
  dropDownOptions?: { name: string; code: string }[];
  dropDownLabel?: string;
  dropDownValue?: string;
  range?: boolean;
  customLabel?: boolean;
}
