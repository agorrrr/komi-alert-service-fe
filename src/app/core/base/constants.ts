export const SETTLEMENT_MEHOTD_LIST: readonly { key: string; value: string }[] =
  [
    { key: 'ONLINE', value: 'Online' },
    { key: 'INVOICE', value: 'Manual Debit' },
  ];

export const CHANNEL: any = [
  {
    "id": "1CCBEACDD7BD233EE065025056B777E0",
    "channelId": 3,
    "name": "ECP",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "ISO"
  },
  {
    "id": "1E6180AEEA2F2388E065025056B777E0",
    "channelId": 91,
    "name": "MANAGEMENT",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "JSON"
  },
  {
    "id": "1E6180AEEA302388E065025056B777E0",
    "channelId": 92,
    "name": "PORTAL BANK",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "JSON"
  },
  {
    "id": "1E6180AEEA312388E065025056B777E0",
    "channelId": 93,
    "name": "PORTAL COMPANY",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "JSON"
  },
  {
    "id": "1C298A048417329EE065025056939280",
    "channelId": 1,
    "name": "NEWIBANK",
    "isDefault": "N",
    "isEnable": "No",
    "messageFormat": "XML"
  },
  {
    "id": "1C298A048418329EE065025056939280",
    "channelId": 2,
    "name": "NEWMBANK",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "XML"
  },
  {
    "id": "1C298A048419329EE065025056939280",
    "channelId": 9,
    "name": "ONLINE",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "XML"
  },
  {
    "id": "1C298A04841A329EE065025056939280",
    "channelId": 4,
    "name": "MAVERICK",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "JSON"
  },
  {
    "id": "1C298A04841B329EE065025056939280",
    "channelId": 6,
    "name": "MOBILE",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "XML"
  },
  {
    "id": "1C298A04841C329EE065025056939280",
    "channelId": 7,
    "name": "TELLER",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "XML"
  },
  {
    "id": "1C298A04841D329EE065025056939280",
    "channelId": 8,
    "name": "BNIDIRECT",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "XML"
  },
  {
    "id": "1C298A04841E329EE065025056939280",
    "channelId": 11,
    "name": "AGENT46",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "XML"
  },
  {
    "id": "FFA7779463C90226E0550250569062D2",
    "channelId": 5,
    "name": "NEWMOBILE",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "JSON"
  },
  {
    "id": "1DFBC6302DE3F0EEE0636004A8C0C212",
    "channelId": 21,
    "name": "ATM",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "ISO"
  },
  {
    "id": "1DFBC6302DE2F0EEE0636004A8C0C212",
    "channelId": 22,
    "name": "SWITCHER",
    "isDefault": "N",
    "isEnable": "Yes",
    "messageFormat": "ISO"
  }
];

export const TRANSACTION_TYPE: any =  [
  { id: 1, name: "AUTORENEWALVA", isActive: true },
  { id: 2, name: "CREATEVABALANCE", isActive: false },
  { id: 3, name: "TRANSFERINQUIRY", isActive: true },
  { id: 4, name: "TRANSFERVA", isActive: false },
  { id: 5, name: "BALANCEINQUIRY", isActive: true },
  { id: 6, name: "INQUIRYVA", isActive: false },
  { id: 7, name: "PAYMENTVA", isActive: true },
  { id: 8, name: "CORRECTIONVA", isActive: false },
  { id: 9, name: "REVERSALVA", isActive: true },
  { id: 10, name: "WITHDRAWAL", isActive: false }
];

export const PERIODE: readonly { name: string, value: string }[] = [
  { name: 'Daily', value: 'Daily' },
  { name: 'Weekly', value: 'Weekly' },
  { name: 'Monthly', value: 'Monthly' },
  { name: 'Yearly', value: 'Yearly' },
];

export const DAYS: readonly { name: string, value: string }[] = [
  { name: 'Monday', value: 'Monday' },
  { name: 'Tuesday', value: 'Tuesday' },
  { name: 'Wednesday', value: 'Wednesday' },
  { name: 'Thursday', value: 'Thursday' },
  { name: 'Friday', value: 'Friday' },
  { name: 'Saturday', value: 'Saturday' },
  { name: 'Sunday', value: 'Sunday' },
];

export const ACTION_RENEWAL: readonly { name: string, value: string }[] = [
  { name: 'SUM', value: 'SUM' },
  { name: 'RESET', value: 'RESET' }
];


export const CHARGES_METHOD_LIST: readonly { key: string; value: string }[] = [
  { key: 'DETAIL', value: 'Detail' },
  { key: 'CONSOLIDATE', value: 'Consolidate' },
];

export const STATUS_CODE_LIST: { key: string; value: string }[] = [
  { key: 'N', value: 'Inactive' },
  { key: 'Y', value: 'Active' },
];


export const DECIMAL_FRACTION_LIST: { key: string; value: string }[] = [
  { key: 'N', value: 'No' },
  { key: 'Y', value: 'Yes' },
];

export const CHARGE_TO_LIST: readonly { key: string; value: string }[] = [
  { key: 'COMPANY', value: 'Company' },
  { key: 'CUSTOMER', value: 'Customer' },
];

export const REVENUE_MODEL_LIST: readonly { key: string; value: string }[] = [
  { key: 'BANK', value: 'Bank' },
  { key: 'SHARING', value: 'Sharing' },
];
export const EXECUTION_MODE_LIST: readonly { key: string; value: string }[] = [
  { key: 'IMMEDIATE', value: 'Immediate' },
  { key: 'SPECIFIC_DATE', value: 'Specific Date' },
  { key: 'PERIOD', value: 'MONTHLY' },
];

export const PRICING_MODEL: readonly { key: string; value: string }[] = [
  { key: 'FLAT', value: 'Flat' },
  { key: 'GRADUATED', value: 'Graduated' },
];
export const PERIOD_LIST: readonly { key: string; value: string }[] = [
  /*{ key:"DAILY",value:'Daily'},
    { key:"WEEKLY",value:'Weekly'},*/
  { key: 'MONTHLY', value: 'PERIOD' },
];

export const LANGUAGE_LIST:  { key: string; value: string }[] = [
  { key: 'id', value: 'Indonesia' },
  { key: 'en', value: 'English' },
];

export const NOTIF_LIST: readonly { key: string; value: string }[] = [
  { key: 'EMAIL', value: 'Email' },
  { key: 'WA', value: 'Whatsapp' },
  { key: 'SMS', value: 'SMS' },
];

export const TYPE_NOTIF_LIST: readonly { key: string; value: string }[] = [
  { key: 'Y', value: 'Failed/Error' },

];

export const TGL_LIST: readonly number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

export const BLACKLIST_NAME_TYPE: readonly { key: string; value: string }[] = [
  { key: 'INDIVIDUAL', value: 'Individual' },
  { key: 'ENTITY', value: 'Entity' },
];


export const STATUS_NOTIF_LIST: readonly { key: string; value: string }[] = [
  { key: 'N', value: 'Disable' },
  { key: 'Y', value: 'Enable' },
];

export const STATUS_YES_NO_LIST = [
  { key: 'N', name: 'No' },
  { key: 'Y', name: 'Yes' },
];

export const EXECUTION_MODE_LIST_COMPANY: readonly {
  key: string;
  value: string;
}[] = [
  { key: 'IMMEDIATE', value: 'Immediate' },
  { key: 'SPECIFIC_DATE', value: 'Specific Date' },

  { key: 'START_OF_MONTH', value: 'Start of Month' },
];


export const CURRENCY_LIST:  {
  code: string,
  numberCode: string,
  name: string,
  countryName: string
}[] =
  [
    {
      code: "IDR",
      numberCode: "360",
      name: "Rupiah",
      countryName: "Indonesia"
    },
    {
      code: "USD",
      numberCode: "840",
      name: "United States Dollar",
      countryName: "United States"
    },
    {
      code: "SGD",
      numberCode: "702",
      name: "Singapore Dollar",
      countryName: "Singapore"
    },

    {
      code: "CNY",
      numberCode: "156",
      name: "Chinese Yuan",
      countryName: "China"
    },
    {
      code: "EUR",
      numberCode: "978",
      name: "Euro",
      countryName: "Eurozone"
    },
    {
      code: "CAD",
      numberCode: "124",
      name: "Canadian Dollar",
      countryName: "Canada"
    },
    {
      code: "JPY",
      numberCode: "392",
      name: "Japanese Yen",
      countryName: "Japan"
    },
    {
      code: "GBP",
      numberCode: "826",
      name: "British Pound Sterling",
      countryName: "United Kingdom"
    },
    {
      code: "AUD",
      numberCode: "036",
      name: "Australian Dollar",
      countryName: "Australia"
    },

    {
      code: "CHF",
      numberCode: "756",
      name: "Swiss Franc",
      countryName: "Switzerland"
    },

    {
      code: "SEK",
      numberCode: "752",
      name: "Swedish Krona",
      countryName: "Sweden"
    },
    {
      code: "NZD",
      numberCode: "554",
      name: "New Zealand Dollar",
      countryName: "New Zealand"
    }
  ]


export enum LogTypeAudit {
  READ_DATA = 1,
  CREATE_DATA = 2,
  UPDATE_DATA = 3,
  DELETE_DATA = 4,
  VIEW_DATA = 5,
}

export const numbbering: any = {
  prefix: null,
  oid: null,
  oid_length: null,
  status:null
};

export const pricingDetail:any = {

  pricingName:null,
  firstUnit:null,
  lastUnit:null,
  pricePerUnit:null,
  flatFee:null,


  pricePerUnit3rdParty:null,
  flatFee3rdParty:null,

};

export const additionalData:any = {
  key:null,
  value:null,
};

export const matrixChannelTable: any = {
  channel: null,
  transaction: null
};


export const graduatedDetail:any = {

  code:null,
  graduatedName:null,
  currencyCode:null,

  description:null,
  statusCode:null,
  pricingDetail: null,
}
export const graduatedDeteletJson: any = {
  graduatedName: null,
  description: null,
};
export const billingDetail: any = {
  billCode: null,
  billNo: null,
  billName: null,
  billShortName: null,
  billDescriptionIn: null,
  billDescriptionEn: null,
  billSubCompany: null,
  billAmount: null,
  // billDescription: null
};



export const companyBankAccount: any = {
  companyName: null,
  accountNo: null,
  accountName: null,
  accountProduct: null,

  accountType: null,
  currency: null,
  isCharge: null,
  isParent: null,
  isRevenue: null,
};


export const companyBankAccountDelete: any = {
  companyName: null,
  accountNo: null,
  accountName: null,
  accountProduct: null,

  accountType: null,
  currency: null,
  isCharge: null,
  isParent: null,
  isRevenue: null,
};

export const createSetParametersJson :any = {
  id:null,
  companyName:null,
  totalCardIssuence:null,
}
export const updateSetParametersJson :any = {
  companyName:null,
  totalCardIssuence:null,
  limitCardStock:null,
}

export const ouJson: any = {
  companyName: null,
  organizationalCode: null,
  cif_no: null,
  organizationalName: null,
  brand_name: null,
  branch_Name: null,
  branch_code: null,


  countryName:null,
  provinceName:null,
  cityName:null,
  address: null,
  zip_postal: null,
  npwp: null,
  phone_no: null,
  fax: null,
  business_type_name: null,
  status: null,

};

export const channelJson: any = {
  channelCode: null,
  channelName: null,
  isDefault: null,
  isEnable: null,
  messageFormat: null,
  metadataList :null
};


export const companyCreateJson: any = {
  company_code: null,

  companyName: null,
  address: null,
  countryName:null,

  provinceName: null,
  cityName: null,
  zip_postal: null,
  npwp: null,
  phone_no: null,

  fax: null,
  businessType:null,
  contract_number: null,
  payment_flaggingnName:null,
  pdpAgreementName:null,
  status: null,
  rm_name: null,
  rm_email: null,
  rm_phone: null,
  rm_job_title: null,
  cp_name: null,
  cp_email: null,
  cp_phone: null,
  cp_job_title: null,










};



export const vaRevenuePoolJson: any = {
  accountNumber: null,
  accountName: null,
  accountProduct: null,
  currency: null,
  accountType: null,
  poolName: null,
  statusCode: null,
  description: null,

};
export const creationPlan : any={
  graduatedName: null,
  currencyCode: null,
  category: null,
  description: null,
}
export const cardProductJson: any = {
  code: null,
  name: null,
  description: null,
};

export const cardProductDeleteJson: any = {
  id: null,
  name: null,
  description: null,
};

export const companyCardProduct: any = {
  companyName: null,
  cardProduct: null
};

export const cardProduct: any = {
  code: null,
  name: null
};

export const companyCardProductDelete: any = {
  companyId: null,
  companyCode: null,
  companyName: null,
  cardProductCode:null,
  cardProductName: null,
  description: null,
};

export const adminPlan : any={
  graduatedName: null,
  currencyCode: null,
  category: null,
  description: null,

}
export const schemeDebitJson: any = {
  schemeName: null,
  description: null,
  minimum: null,
  maximum: null,

  typeVa: {
    typeName: null,
    description: null,
  },
  currency: {
    currencyCode: null,
    currencyName: null,
  },

  chargesCreation: {
    creationChargeTo: null,
    creationSettlementMethod: null,
    creationChargeMethod: null,
    creationExecutionMode: null,
    creationExecutionDate: null,
    creationPricingType:null,

    currency: null,
    amount:null,
    creationValue:null,
    creationStatusCode: null,
    creationRemarks:null,
    creationPlan:null,
  },

  chargesAdministration: {
    adminChargeTo: null,
    adminSettlementMethod: null,
    adminChargeMethod: null,
    adminExecutionMode: null,
    adminExecutionDate: null,
    adminPricingType:null,

    currency: null,
    amount:null,
    adminValue:null,
    adminStatusCode: null,
    adminRemarks:null,
    adminPlan:null,
  },

  chargesUsage: {
    usageChargeTo: null,
    usageSettlementMethod: null,
    usageChargeMethod: null,
    usageExecutionMode: null,
    usageExecutionDate: null,
    usagePricingType:null,

    currency: null,
    usageValue: null,
    usageStatusCode: null,
    usageRemarks:null,
    usagePlan:null,
  },


  chargesTransaction: {
    transactionChargeTo: null,
    transactionSettlementMethod: null,
    transactionChargeMethod: null,
    transactionExecutionMode: null,
    transactionExecutionDate: null,
    transactionPricingType:null,

    transactionRevenueModel: null,
    currency: null,
    amountBank:null,
    amountCompany:null,


    total:null,
    transactionValueBank:null,
    transactionStatusCode: null,
    transactionRemarks:null,
    transactionPlan:null,
  },

  chargesCardCreation: {
    creationCardChargeTo: null,
    creationCardSettlementMethod: null,
    creationCardChargeMethod: null,
    creationCardExecutionMode: null,
    creationCardPricingType:null,
    currency: null,
    amount:null,

    creationCardStatusCode: null,
    creationCardRemarks:null,
  },

  chargesCardAdministration: {
    adminCardChargeTo: null,
    adminCardSettlementMethod: null,
    adminCardChargeMethod: null,
    adminCardExecutionMode: null,
    adminCardPricingType:null,
    currency: null,

    amount:null,
    adminCardStatusCode: null,
    adminCardRemarks:null,
  },

  limit :{
    currency: null,
    minimumBalanceCurrency: null,
    maximumBalanceCurrency: null,
    dailyLimitAmountCurrency: null,
    transactionLimitAmountPerDay: null,
    dayLimitFrequency:null,
    weeklyLimitAmountCurrency: null,
    weeklyLimitFrequency:null,
    monthlyLimitAmountCurrency: null,
    monthLimitFrequency:null,
    limitFrequency: null,
    limitStatusCode: null,
  },
};
export const schemeCreditJson: any = {
  schemeName: null,
  description: null,
  minimum: null,
  maximum: null,

  typeVa: {
    typeName: null,
    description: null,
  },
  currency: {
    currencyCode: null,
    currencyName: null,
  },

  chargesCreation: {
    creationChargeTo: null,
    creationSettlementMethod: null,
    creationChargeMethod: null,
    creationExecutionMode: null,
    creationExecutionDate: null,
    creationPricingType:null,

    currency: null,
    amount:null,

    creationStatusCode: null,
    creationRemarks:null,
    creationPlan:null,
  },

  chargesAdministration: {
    adminChargeTo: null,
    adminSettlementMethod: null,
    adminChargeMethod: null,
    adminExecutionMode: null,
    adminExecutionDate: null,
    adminPricingType:null,

    currency: null,
    amount:null,

    adminStatusCode: null,
    adminRemarks:null,
    adminPlan:null,
  },

  chargesUsage: {
    usageChargeTo: null,
    usageSettlementMethod: null,
    usageChargeMethod: null,
    usageExecutionMode: null,
    usageExecutionDate: null,
    usagePricingType:null,

    currency: null,
    usageValue: null,
    usageStatusCode: null,
    usageRemarks:null,
    usagePlan:null,
  },


  chargesTransaction: {
    transactionChargeTo: null,
    transactionSettlementMethod: null,
    transactionChargeMethod: null,
    transactionExecutionMode: null,
    transactionExecutionDate: null,
    transactionPricingType:null,

    transactionRevenueModel: null,
    currency: null,
    amountBank:null,
    amountCompany:null,


    total:null,
    transactionStatusCode: null,
    transactionRemarks:null,
    transactionPlan:null,
  },

  limit :{
    currency: null,
    transactionLimitAmount:null,
    dailyLimitAmountCurrency: null,
    transactionLimitAmountPerDay: null,
    dayLimitFrequency:null,
    monthlyLimitAmountCurrency: null,
    monthLimitFrequency:null,
    limitFrequency: null,
    limitStatusCode: null,
  },
};

export const schemeDeteletJson: any = {
  name: null,
  description: null,
};

export const vaCreateJson: any = {

  customerNo: null,
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountPhone: null,
  virtualAccountEmail: null,
  virtualBalanceFormatted: null,
  MinVirtualBalanceFormatted: null,
  totalAmount: null,
  startDate: null,
  expiredDate: null,
  minimum: null,
  maximum: null,
  billStartDate: null,
  billExpiredDate: null,
  isSetRenewal:null,
  periode:null,
  renewalDate:null,
  renewalDay:null,
  renewalMonth:null,
  action:null,
  amountCurrency:null,
  customerCode:null,
  channels: null,
  billingDetail: null,

  company: {
    companyCode: null,
    companyName: null,
  },

  organizationUnit: {
    ouCode: null,
    ouName: null,
  },

  numbering: {
    template: null,
    oid: null,
    name: null,
    prefix:null,
  },
  sequenceLengthType:null,
  sequenceLengthMinimum:null,
  sequenceLengthMaximum:null,

  product: {
    productCode: null,
    productName: null,
    schemeName: null,
    typeName: null,
  },
  // customerNew: {
  //     name: null,
  //     emailAddress: null,
  //     identityType: null,
  //     identityValue: null,
  //     phoneNumber: null,
  //     gender: null,
  //     birthDate: null,
  //     address: null,
  //     city: null,
  //     country: null,
  //     postalCode: null,
  //     cifNo: null
  //   },

  limit : null,
  // limitIsOverride : null,
  // minimumBalanceCurrency: null,
  // maximumBalanceCurrency: null,
  // dailyLimitAmountCurrency : null,
  // dailyLimitFrequency : null,
  // weeklyLimitAmountCurrency : null,
  // weeklyLimitFrequency : null,
  // monthlyLimitAmountCurrency : null,
  // monthlyLimitFrequency : null,
  // },

  // matrix: {
  //   matrixIsOverride : null,
  //   matrixChannelTable: null,
  // }
  matrixIsOverride : null,
  matrixChannelTable: null

};

export const updateRenewal: any = {
  customerNo: null,
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountPhone: null,
  virtualAccountEmail: null,


  isSetRenewal:null,
  periode:null,
  renewalDate:null,
  renewalDay:null,
  renewalMonth:null,
  action:null,
  amountCurrency:null,











































};

export const vaUpdate: any = {
  company : {
    companyCode : null,
    companyName : null,
  },
  organizationUnit :{

    ouCode : null,
    ouName : null,
  },
  numbering :{
    template: null,
    oid: null,
    name: null,
    prefix:null,
  },
  product :{
    productName : null,
    schemeName : null,
    typeName : null
  },
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountPhone: null,
  virtualAccountEmail: null,

  MinVirtualBalanceFormatted:null,
  startDate: null,
  expiredDate: null,
  currencyMinBalance: null,
  statusVA: null,
  minimum: null,
  maximum: null,
  transactionDay:null,
};

export const vaUpdateStatus: any = {
  company : {
    companyCode : null,
    companyName : null,
  },
  organizationUnit :{

    ouCode : null,
    ouName : null,
  },
  numbering :{
    template: null,
    oid: null,
    name: null,
    prefix:null,
  },
  product :{
    productName : null,
    schemeName : null,
    typeName : null
  },
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountPhone: null,
  virtualAccountEmail: null,
  virtualBalance: null,
  statusVA: null,
  statusBilling: null,
  startDate: null,
  expiredDate: null,
};

export const vaUpdateBalanceDebit: any = {
  company : {
    companyCode : null,
    name : null,
  },
  organizationUnit :{
    oid : null,
    ouCode : null,
    name : null,
  },
  numbering :{
    name : null,
    template : null,
  },
  product :{
    name : null,
    schemeName : null,
    typeName : null
  },
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountPhone: null,
  virtualAccountEmail: null,

  action: null,
  newVirtualBalanceFormatted: null,
  oldVirtualBalanceFormatted: null,

  startDate: null,
  expiredDate: null,
};

export const vaUpdateDebitLimit: any = {
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountPhone: null,
  virtualAccountEmail: null,
  startDate: null,
  expiredDate: null,
  company : {
    name : null,
  },
  organizationUnit :{
    ouCode : null,
  },
  numbering :{
    name : null,
    template : null,
  },
  product :{
    schemeName : null,
    typeName : null
  },

  limit : {
    limitIsOverride : null,
    minimumBalanceCurrency: null,
    maximumBalanceCurrency: null,
    dailyLimitAmount : null,
    dailyLimitFrequency : null,
    weeklyLimitAmount : null,
    weeklyLimitFrequency : null,
    monthlyLimitAmount : null,
    monthlyLimitFrequency : null,
  },


  // limitIsOverride: null,
  // minimumBalanceCurrency: null,
  // maximumBalanceCurrency: null,
  // dailyLimitAmountCurrency: null,
  // dailyLimitFrequency: null,
  // monthlyLimitAmountCurrency: null,
  // monthlyLimitFrequency: null
};

export const valinkDebit: any = {
  company : {
    companyCode : null,
    name : null,
  },
  organizationUnit :{
    oid : null,
    ouCode : null,
    name : null,
  },
  numbering :{
    name : null,
    template : null,
  },
  product :{
    name : null,
    schemeName : null,
    typeName : null
  },
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountPhone: null,
  virtualAccountEmail: null,
  startDate: null,
  expiredDate: null,
  channels: null,
};

export const users: any = {
  companyName: null,
  ouname: null,
  role: null,

  username: null,
  nameUser: null,
  email: null,
  mobile: null,
  statusUser: null,
};



export const billingCreate: any = {
  company: {
    companyCode: null,
    companyName: null,


  },
  organizationUnit: {
    organizationalCode: null,
    organizationalName: null,


  },
  numbering: {
    template: null,
    oid: null,
    name: null,
    prefix:null,
  },
  product: {
    productCode: null,
    productName: null,
    schemeName: null,

    typeName: null,


  },
  customerNo: null,
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountEmail: null,
  virtualAccountPhone: null,
  billNo: null,
  billName: null,
  billShortName: null,
  billStartDate: null,
  billExpiredDate: null,
  totalAmount: null,
  currency: null,
  billingDetail: null,
};

export const billingUpdate: any = {
  company : {
    companyCode : null,
    companyName : null,
  },
  organizationUnit :{

    ouCode: null,
    ouName: null,
  },
  numbering :{
    template: null,
    oid: null,
    name: null,
    prefix:null,
  },
  product :{
    productCode : null,
    productName : null,
    schemeName : null,
    typeName : null
  },
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountEmail: null,
  virtualAccountPhone: null,
  statusVA: null,
  statusBilling: null,
  startDate: null,
  expiredDate: null,
  billStartDate:null,
  billExpiredDate:null,
  statusReason: null,
  billingDetail:null
};

export const productCreditJson: any = {
  productCode: null,
  productName: null,

  minimum: null,
  maximum: null,
  billingData: null,
  scheme: {
    schemeName: null,
    vaTypeName: null,
    description: null,


    currency:null,
  },
  company: {
    companyName: null,
    organizationUnitName: null,
    virtualNumbering: null,
    revenuePoolName: null,
    parrentAccountName: null,
    chargeAccountName: null,
    revenueAccountName: null,
  },
  chargesCreation: {
    isOverride: null,
    creationChargeTo: null,
    creationSettlementMethod: null,
    creationChargeMethod: null,
    creationExecutionMode: null,
    creationExecutionDate: null,
    creationPricingType:null,
    currency: null,
    amount:null,

    creationStatusCode: null,
    creationRemarks:null,
    creationPlan:null,
  },

  chargesAdministration: {
    isOverride: null,
    adminChargeTo: null,
    adminSettlementMethod: null,
    adminChargeMethod: null,
    adminExecutionMode: null,
    adminExecutionDate: null,
    adminPricingType:null,

    currency: null,
    amount:null,

    adminStatusCode: null,
    adminRemarks:null,
    adminPlan:null,
  },

  chargesUsage: {
    usageChargeTo: null,
    usageSettlementMethod: null,
    usageChargeMethod: null,
    usageExecutionMode: null,
    usageExecutionDate: null,
    usagePricingType:null,

    currency: null,
    usageValue: null,
    usageStatusCode: null,
    usageRemarks:null,
    usagePlan:null,
  },

  chargesTransaction: {
    isOverride: null,
    transactionChargeTo: null,
    transactionSettlementMethod: null,
    transactionChargeMethod: null,
    transactionExecutionMode: null,
    transactionExecutionDate: null,
    transactionPricingType:null,
    transactionApplyThirdParty:null,
    transactionThirdParty:{
      code: null,
      name: null,
      addres: null
    },
    transactionRevenueModel: null,
    currency: null,
    transactionValueBank: null,
    transactionValueCompany: null,
    transactionValueThirdParty: null,
    total:null,
    transactionStatusCode: null,
    transactionRemarks:null,
    transactionPlan:null,
  },




  limit: {
    isOverrideLimit: null,
    currency: null,
    transactionLimitAmount:null,
    transactionLimitAmountPerDay: null,
    amountLimitForVaCreation: null,
    limitFrequency: null,
    limitStatusCode: null,
  },


};

export const productDebitTrxValidityJson: any = {
  productName: null,
  productCode: null,
  transactionValidity: null,
  calendar: {
    name: null,
    year: null,
  }
}

export const calendar: any = {
  name: null,
  year: null,
  description: null,
  holidays: null
}

export const MySmartVA: any = {
  customer: {
    name: null,
    customerCode: null,
  },
  company: {
    name: null,
    code: null
  },
  ou: {
    name: null,
    code: null
  },
}

export const MySmartVAEdit: any = {
  vaNumber:null
}

export const productDebitJson: any = {
  productCode: null,
  productName: null,

  minimum: null,
  maximum: null,
  billingData: null,
  transactionValidity: null,
  calendar: {
    name: null,
    year: null,
    description: null
  },
  scheme: {
    schemeName: null,
    vaTypeName: null,
    description: null,


    currency:null,
  },
  company: {
    companyName: null,
    organizationUnitName: null,
    virtualNumbering: null,
    revenuePoolName: null,
    parrentAccountName: null,
    chargeAccountName: null,
    revenueAccountName: null
  },
  chargesCreation: {
    isOverride: null,
    creationChargeTo: null,
    creationSettlementMethod: null,
    creationChargeMethod: null,
    creationExecutionMode: null,
    creationExecutionDate: null,
    creationPricingType:null,
    currency: null,
    amount:null,

    creationStatusCode: null,
    creationRemarks:null,
    creationPlan:null,
  },

  chargesAdministration: {
    isOverride: null,
    adminChargeTo: null,
    adminSettlementMethod: null,
    adminChargeMethod: null,
    adminExecutionMode: null,
    adminExecutionDate: null,
    adminPricingType:null,

    currency: null,
    amount:null,

    adminStatusCode: null,
    adminRemarks:null,
    adminPlan:null,
  },

  chargesTransaction: {
    isOverride: null,
    transactionChargeTo: null,
    transactionSettlementMethod: null,
    transactionChargeMethod: null,
    transactionExecutionMode: null,
    transactionExecutionDate: null,
    transactionPricingType:null,
    transactionApplyThirdParty:null,
    transactionThirdParty:{
      code: null,
      name: null,
      addres: null
    },
    transactionRevenueModel: null,
    currency: null,
    transactionValueBank: null,
    transactionValueCompany: null,
    transactionValueThirdParty: null,
    total:null,
    transactionStatusCode: null,
    transactionRemarks:null,
    transactionPlan:null,
  },

  chargesUsage: {
    usageChargeTo: null,
    usageSettlementMethod: null,
    usageChargeMethod: null,
    usageExecutionMode: null,
    usageExecutionDate: null,
    usagePricingType:null,

    currency: null,
    usageValue: null,
    usageStatusCode: null,
    usageRemarks:null,
    usagePlan:null,
  },

  chargesCardCreation: {
    isOverride: null,
    creationCardChargeTo: null,
    creationCardSettlementMethod: null,
    creationCardChargeMethod: null,
    creationCardExecutionMode: null,
    creationCardPricingType:null,
    currency: null,
    amount:null,

    creationCardStatusCode: null,
  },

  chargesCardAdministration: {
    isOverride: null,
    adminCardChargeTo: null,
    adminCardSettlementMethod: null,
    adminCardChargeMethod: null,
    adminCardExecutionMode: null,
    adminCardPricingType:null,
    currency: null,
    amount:null,

    adminCardStatusCode: null,
  },
  debitLimit : {
    limitIsOverride: null,
    minimumBalanceCurrency: null,
    maximumBalanceCurrency: null,
    dailyLimitAmountCurrency: null,
    dayLimitFrequency:null,
    weeklyLimitAmountCurrency: null,
    weeklyLimitFrequency:null,
    monthlyLimitAmountCurrency: null,
    monthLimitFrequency:null,
    isOverrideLimit: null,
    currency: null,
    transactionLimitAmountPerDay: null,
    amountLimitForVaCreation: null,
    limitFrequency: null,
    limitStatusCode: null,
  },

  matrixChannelTable: null
};


export const productDeleteJson: any = {
  name: 'Product Baru yaa',
  schemeName: 'Scheme Baru',
  companyName: 'PT MJD Solution',
};

export const creatCardJson: any = {
  "companyCode": null,
  "companyName": null,
  "ouCode": null,
  "ouname": null,
  "cardProductCode": null,
  "cardProductName": null,
  "numberOfCard": null,
};

export const updateCardJson: any = {
  "accountNo": null,
  "cardNumber": null,
  "cardStatus": null,
  "branchCode": null,
  "cardProductName": null,
  "cardIssued": null,
  "cardActivated": null,
  "expiryDate": null,
};
export const reissuePinJson: any = {

  "id": null,
  "companyCode": null,
  "ouCode": null,
  "cardNumber": null,
  "cardProduct": null,
};




export const linkUnlinkCardJson: any = {
  card:{
    cardNumber: null,
    companyName: null,
    companyCode: null,
    ouName: null,
    ouCode: null,
    cardProduct: null,
    cardProductCode: null,
    branchCode: null,
  },
  va:{
    customerNo: null,
    virtualAccountNo: null,
    virtualAccountName: null,
    virtualAccountPhone: null,
    virtualAccountEmail: null,
  }
};

export const acceptenceCardJson: any = {
  cardNumber: null,
  virtualAccountNo: null,
  companyName: null,
  companyCode: null,
  ouName: null,
  ouCode: null,
  cardProduct: null,
  cardProductCode: null,
  branchCode: null,
};

export const instantAcceptanceCardJson= {
  card: null
}

export const activationCardJson: any = {
  cardNumber: null,
  virtualAccountNo: null,
  companyName: null,
  companyCode: null,
  ouName: null,
  ouCode: null,
  cardProduct: null,
  cardProductCode: null,
  branchCode: null,
};

export const registerCardJson: any = {
  card:{
    cardNumber: null,
    cardName:null,
    companyName: null,
    companyCode: null,
    ouName: null,
    ouCode: null,
    cardProductName: null,
    cardTypeName: null,
    branchCode: null,
  },
  va:{
    customerNo: null,
    virtualAccountNo: null,
    virtualAccountName: null,
    virtualAccountPhone: null,
    virtualAccountEmail: null,
  }
};


export const billingUpdateUState: any = {
  virtualAccountNo: null,
  virtualAccountName: null,
  virtualAccountEmail: null,
  virtualAccountPhone: null,
  billNo: null,
  billName: null,
  billShortName: null,
  billStartDate: null,
  billExpiredDate: null,
  billingDetail: null,
};

export const companyRegis: any = {
  company_code: null,
  companyName: null,
  charge_to:null,
  settlement_method: null,
  charge_method: null,
  execution_mode: null,
  pricing_type: null,
  currency_code: null,
  collection: null,
  amount: null,
  status_code: null,

  id_revenue_pool: {
    poolName: null,
    accountName: null,
    accountNumber: null,
    accountType: null,
    currency: null,

  },
  id_company_charge_account: {
    accountName: null,
    accountNumber: null,

    accountType: null,
    currency: null,
  },

};

export const companyIntegration: any = {
  companyName: {
    companyCode: null,
    name: null,
    address: null,
    zipPostal: null,
    npwp: null,
    province: null,
    country: null,
    phoneNo: null,
    fax: null,
    partnerId:null,
  },
  ftp : {
    url:null,
    username:null,
    password:null,
    folder:null,
  },
  paymentCallback : {

    gateway: {
      name: null,
      gatewayAdditionaParameter: null,
      gatewayAuthType: null,
      gatewayUsername: null,
      headerXPatnerId: null,
      gatewayTimeout: null,
      gatewayConnectTimeout:null
    },
    templateSpec: {
      name: null,
      code: null,
      format: null,
    },
    url: null,
    timeout: null,
    maxRetry: null,
    interval:null,
    additionalData: null
  },

  inquiry : {

    gateway: {
      name: null,
      gatewayAdditionaParameter: null,
      gatewayAuthType: null,
      gatewayUsername: null,
      headerXPatnerId: null,
      gatewayTimeout: null,
      gatewayConnectTimeout:null
    },
    templateSpec: {
      name: null,
      code: null,
      format: null,
    },
    url: null,
    timeout: null,
    maxRetry: null,
    additionalData: null
  },
};

export const companyIntegrationDelete: any = {
  companyName: null,
  gatewayName: null,
  templateName: null,
  header: null,
  callbackAdditionalData: null,
  callbackUrl: null,
  callbackTimeout: null,
  callbackMaxRetry: null,
};
export const matrixNotification: any = {
  matrix:null,
};
export const matrix:any = {
  eventKey:null,
  eventName:null,
  description:null,
  email:null,
  whatsapp:null,
  sms:null,
};

export const customer: any = {
  companyCode: null,
  companyName:null,
  ouCode: null,
  ouName: null,
  customerCode: null,
  name: null,
  emailAddress: null,
  identityType: null,
  identityValue: null,
  phoneNumber: null,
  gender: null,
  birthDate: null,
  address: null,
  city: null,
  country: null,
  postalCode: null,
  cifNo: null,
  status:null,
};

export const customerUpdate: any = {
  companyName: null,
  ouName: null,
  customerCode: null,
  name: null,
  emailAddress: null,
  identityType: null,
  identityValue: null,
  phoneNumber: null,
  gender: null,
  birthDate: null,
  address: null,
  city: null,
  country: null,
  postalCode: null,
  cifNo: null,
  status:null,
};


export const virtualNUmbering: any = {





  companyName:null,
  cid: null,
  statusLabel: null,
  remarks:null,


  organizationList:null,
  numberingList:null,




};


export const thirdParty: any = {
  third_party_code:null,
  third_party_name: null,
  country_name: null,
  province_name: null,
  city_name: null,
  address: null,
  zip_postal: null,
  npwp: null,
  phone_no: null,
  fax: null,
  status: null,
  cp_name: null,
  cp_email: null,
  cp_phone: null,
  cp_job_title: null,

};

export const createIncidental :any = {
  targetDate: null,
  balanceLimit: null,
  virtualAccountNo: null,

}
export const updateIncidental :any = {
  targetDate: null,
  balanceLimit: null,
  virtualAccountNo: null,

}
export const updateCancelIncidental :any = {
  incidentalBalanceId:null,
}
export const channelsTransactionTable: any = {
  channelName:null,
  transactionString: null,

};
export const updateMatrixTransaction: any = {
  virtualAccountNo: null,
  customerNo:null,
  channelsTransactionTable: null
};

