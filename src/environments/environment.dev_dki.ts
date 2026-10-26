export const environment = {
  production: true, // Modify this as needed
  environmentName: 'general-apps',
  tenantCode: 'TN001',

  reportUrl: 'http://report-agent.fds.mii.labs',
  kibanaUrl: 'http://184.169.41.109:5611',
  pageUrl: 'http://10.114.40.54:14033',
  apiUrl: 'http://10.114.40.54:14033/mgm',
  baseUrl: 'http://10.114.40.54:14033/fds',
  socketUrl: 'http://10.114.40.54:14033',
  apiUrlSSO: 'https://192.168.175.5:45415/mgm',
  baseUrlSSO: 'https://192.168.175.5:45415/smartva',
  keyApp: '82fb4e99468560d7752555b97618294a',
  idApp: '100797',
  //keyApp: 'a9421b7cc6ba232930ceb90e6b227d30',
  keyCompany: 'a9421b7cc6ba232930ceb90e6b227d30',
  keyKibana:{
    dashboard: '52068bf9-7993-4929-851f-698b569b9026',
    transactionTrends:'5ee93195-2d05-412a-900c-06d33941a5a8',
    caseTrends:'7cde2079-2f28-4e83-bac6-58ddf6259ee0',
    auditTrail:'e1bbe8a6-e010-437f-b8f8-f382d4f2d118',
  }
};
