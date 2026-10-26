
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    public nextModal = false;
    public nextModalType = null;
    public nextModalMsg = null;


    constructor(
        private messageService: MessageService,
        private translate:TranslateService
    ) { }

    public showSuccessUpdate() {
        this.messageService.add({ severity: 'success', summary: this.translate.instant('success'), detail:this.getUpdate() ,life: 5000});
    }
    public showSuccessRetry() {
        this.messageService.add({ severity: 'success', summary: this.translate.instant('success'), detail:this.getRetry() ,life: 5000});
    }

    showSuccessUpload(){
      this.messageService.add({ severity: 'success', summary: this.translate.instant('success'), detail: this.getUploadFile() ,life: 5000});
    }

    showSuccessSave(){
      this.messageService.add({ severity: 'success', summary: this.translate.instant('success'), detail: this.getAdd() ,life: 5000});
    }

  showInfo(message:string){
    this.messageService.add({ severity: 'info', summary: this.translate.instant('information'), detail: message,life: 5000});
  }

    showSuccessSaveAndWaitApproval(){
      this.messageService.add({ severity: 'warn', summary: this.translate.instant('success'), detail: this.getAddArroval() ,life: 5000});
    }



    public showSuccessCustom(message:any) {
        this.messageService.add({ severity: 'success', summary: this.translate.instant('success'), detail: message,life: 5000 });
    }

    public showErrorCustom(message:any) {
        this.messageService.add({ severity: 'error', summary: this.translate.instant('error'), detail: message,life: 5000 });
    }

  public showWarnCustom(message:any) {
    this.messageService.add({ severity: 'warn', summary: this.translate.instant('Warning'), detail: message,life: 5000 });
  }


    public showErrorSave() {
        this.messageService.add({ severity: 'error', summary: this.translate.instant('error'), detail: this.getAddErr() ,life: 5000});
    }

    public showErrorUpdate() {
        this.messageService.add({ severity: 'error', summary: this.translate.instant('error'), detail:this.getUpdateErr() ,life: 5000});
    }

    public showSuccessDelete() {
        this.messageService.add({ severity: 'success', summary: this.translate.instant('success'), detail: this.getDelete() ,life: 5000});
    }

    public showErrorDelete() {
        this.messageService.add({ severity: 'error', summary: this.translate.instant('error'), detail: this.getDeleteErr() ,life: 5000});
    }
    public showValidate() {
        this.messageService.add({ severity: 'error', summary: this.translate.instant('error'), detail: this.getValidate() ,life: 5000});
    }


    getAdd(): string {
      return this.translate.instant('successAdd');
    }

    getAddArroval(): string {
      return this.translate.instant('successAddApproval');
    }

    getAddErr(): string {
      return this.translate.instant('failedAdd');
    }

    getUpdate(): string {
      return this.translate.instant('successUpdate');
    }
    getRetry(): string {
      return this.translate.instant('successRetry');
    }

    getUploadFile(): string {
      return this.translate.instant('successUpload');
    }

    getUpdateErr(): string {
      return this.translate.instant('failedUpdate');
    }

    getDelete(): string {
      return this.translate.instant('successDelete');
    }
    getDeleteErr(): string {
      return this.translate.instant('failedDelete');
    }
    getValidate(): string {
      return this.translate.instant('Please add at least one mapping detail before submitting.');
    }

}
