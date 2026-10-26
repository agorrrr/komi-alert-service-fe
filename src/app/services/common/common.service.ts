import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/services/env/env.service';
import { BackendService } from 'src/app/services/backend/backend.service';
enum LogTypeAudit {
  READ_DATA =1,
  CREATE_DATA =2,
  UPDATE_DATA =3,
  DELETE_DATA =4,
  VIEW_DATA =5,
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  static readonly LogTypeAudit = LogTypeAudit
  readonly LogTypeAudit = CommonService.LogTypeAudit


  constructor(private backend: BackendService,private _env:EnvService) { }

  retriveMenusByApp(payload:any) {
    const url = '/common/retriveMenusByApp/'+payload;
    return this.backend.get(url);
  }
  
  retriveGroups(payload:any) {
    const url = '/common/retriveGroups';
    return this.backend.post(url, payload);
  }

  retriveNumbering(){
    const url = `/bvams/common/getDataNumbering`;
    return this.backend.getAPI(url);
  }

  retriveDefaultStatus(){
    const url = `/bvams/common/getDataDefaultStatus`;
    return this.backend.getAPI(url);
  }

  getDataBankAccount() {
    const url = '/bvams/common/bank-account';
    return this.backend.getAPI(url);
  }

  getDataBankAccountByCompany(id:any) {
    const url = '/bvams/common/getDataBankAccountByCompany?param=' + id;
    return this.backend.getAPI(url);
  }

  retriveCurrencyAll() {
    const url = '/bvams/common/getDataCurrency';
    return this.backend.getAPI(url);
  }

  retriveTypeVaAll() {
    const url = '/bvams/common/va-type';
    return this.backend.getAPI(url);
  }

  retriveLImit() {
    const url = '/bvams/common/config-limit';
    return this.backend.getAPI(url);
  }

  retriveGraduatedAll() {
    const url = '/bvams/common/graduated';
    return this.backend.getAPI(url);
  }

  retriveThirdPartyAll() {
    const url = '/bvams/common/third-party';
    return this.backend.getAPI(url);
  }

  retriveGraduatedId(id:any) {
    const url = '/bvams/common/graduated-id?param='+id;
    return this.backend.getAPI(url);
  }


  retriveCompanyStatus() {
    const url = '/bvams/common/getDataCompanyStatus';
    return this.backend.getAPI(url);
  }

  retriveFlaggingPayment() {
    const url = '/bvams/common/getDataPaymentFlagging';
    return this.backend.getAPI(url);
  }

  retriveBusinessType() {
    const url = '/bvams/common/getDataBusinessType';
    return this.backend.getAPI(url);
  }
  retriveBranch() {
    const url = '/bvams/common/getDataBranch';
    return this.backend.getAPI(url);
  }
  retriveCountry() {
    const url = '/bvams/common/getDataCountry';
    return this.backend.getAPI(url);
  }
  retriveProvince(id:any) {
    const url = '/bvams/common/getDataProvince?param='+id;
    return this.backend.getAPI(url);
  }
  retriveCity(id:any) {
    const url = '/bvams/common/getDataCity?param='+id;
    return this.backend.getAPI(url);
  }

  retriveRelationManager() {
    const url = '/bvams/common/getRelationManager';
    return this.backend.getAPI(url);
  }

  retriveScheme() {
    const url = '/bvams/common/get-data-scheme-ou';
    return this.backend.getAPI(url);
  }

  retriveRelationManagerByCompany(id:any) {
    const url = '/bvams/common/getRelationManagerByCompany?param=' + id;
    return this.backend.getAPI(url);
  }

  retriveNumberingByOu(id:any) {
    const url = '/bvams/common/getNumberingByOu?param=' + id;
    return this.backend.getAPI(url);
  }

  getDataCompany() {
    const url = '/bvams/common/getDataCompany';
    return this.backend.getAPI(url);
  }

  getDataCompanyOu() {
    const url = '/bvams/common/getDataCompanyOu';
    return this.backend.getAPI(url);
  }

  getProductByOu(data:any) {
    const url = '/bvams/common/getProductByOu';
    return this.backend.postAPI(url,data);
  }

  retriveRegistrationChargesByCompany(id:any) {
    const url = '/bvams/common/registration-charges-by-company?param='+ id;
    return this.backend.getAPI(url);
  }

  retriveBankAccount() {
    const url = '/bvams/common/bank-account';
    return this.backend.getAPI(url);
  }

  retriveRevenuePool(){
    const url = '/bvams/common/getDataRevenuePool';
    return this.backend.getAPI(url);
  }

  retriveRevenuePoolAll(){
    const url = '/bvams/common/getDataRevenuePoolAll';
    return this.backend.getAPI(url);
  }

  retriveCompanyAll() {
    const url = '/bvams/common/getDataCompany';
    return this.backend.getAPI(url);
  }

  getOuListByCompany(data:any) {
    const url = '/bvams/common/getOuListByCompany';
    return this.backend.postAPI(url,data);
  }

  getAttribute(id:any) {
    const url = '/bvams/common/get-attribute?param='+id;
    return this.backend.getAPI(url);
  }

  getCompanyCode(id:any) {
    const url = '/bvams/common/get-company-code?param='+id;
    return this.backend.getAPI(url);
  }

  getChannel() {
    const url = '/bvams/common/channel';
    return this.backend.getAPI(url);
  }

  getDataDefaultStatus() {
    const url = '/bvams/common/getDataDefaultStatus';
    return this.backend.getAPI(url);
  }

  getDataGateway() {
    const url = '/bvams/common/gateway';
    return this.backend.getAPI(url);
  }

  getDataServiceIntegration() {
    const url = '/bvams/common/service-integration';
    return this.backend.getAPI(url);
  }


  getDataTemplate() {
    const url = '/bvams/common/template';
    return this.backend.getAPI(url);
  }
}
