import { 
  Input,
  Output,
  EventEmitter,
  Component, 
  ChangeDetectorRef} from '@angular/core';
  import { AlertModalService } from 'src/app/services/modal-service/AlertModalService';
  import { MetadataService } from 'src/app/services/metadata/metadata.service';
  import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-table-helper',
    templateUrl: './table-helper.component.html',
    styleUrls: ['./table-helper.component.scss'],
    standalone: false
})
export class TableHelperComponent {
  @Input() objectName: any;
  @Input() data: any[] = [];
  @Input() fields: any[] = [];
  @Input() acl: any;
  @Input() bankOu: any;
  @Input() hideNo: any;
  
  @Input() records: any;

  @Input() restrictData:any

  @Output() addEvent = new EventEmitter<any>();
  @Output() viewEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  
  globalFilter: any[] = [];
  metadata:any;
  rowtable:any[] = [{label: '10', value: 10}, {label: '25', value: 25}, {label: '50', value: 50}, {label: '100', value: 100}]
  rowsPerPage: number = 10;
  rows: number = 10;
  constructor(
    public router: Router,
    readonly alertModalService:AlertModalService,
    readonly metadataService:MetadataService,
    readonly cdr: ChangeDetectorRef,
    readonly translate:TranslateService
  ){}
  
  ngOnInit() {
      this.metadata = this.metadataService.getMetadata();
      this.acl = this.metadataService.findMenuByUrlAcl(this.router.url);
      this.globalFilter = this.fields.map(data => {
        return data.key;
      })
    
  }

  viewData(data:any){
    this.viewEvent.emit(data);
  }

  editData(data:any){
    if(this.restrictData && data.isRestricted){
      this.alertModalService.showAlert(this.translate.instant('This data is restricted to modify!'));
    }else {
      this.updateEvent.emit(data);
    }
  }

  deleteConfirm(data:any){
    if(this.restrictData && data.isRestricted){
      this.alertModalService.showAlert(this.translate.instant('This data is restricted to modify!'));
    }else {
      this.deleteEvent.emit(data);
    }
  }

  addData(){
    this.addEvent.emit();
  }

  showAlert(data:any) {

    if(data.status_code == 'C'){
      this.alertModalService.showAlert(this.translate.instant('Company has been Closed'));
    }else{
      
      this.alertModalService.showAlert(this.translate.instant('Not Authorized for Different Organizational Unit!'));
    }
  }

  changeRowsPerPage(event:any) {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }
}

