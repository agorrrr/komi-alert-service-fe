import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertModalComponent } from './AlertModalComponent';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  constructor(readonly dialogService: DialogService, readonly translate:TranslateService) {}

  showAlert(message: any): void {
   if( this.checkListValue(message)){
    message.map((data:any) => {
      data.msg = this.translate.instant(data.msg)
      return data; 
    })
   }else{
    message = this.translate.instant(message)
   }
        setTimeout(() => {
      
       this.dialogService.open(AlertModalComponent, {
        header: this.translate.instant('Alert'),
        data: { message }, 
        width: '500px',
        closable: true

        
      });
    }, 1500);
  }

  checkListValue(value: any): boolean {
    
    return Array.isArray(value);
  }
}