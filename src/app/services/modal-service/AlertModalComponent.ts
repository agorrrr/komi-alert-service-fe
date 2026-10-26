import { Component, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MetadataService } from '../metadata/metadata.service';

@Component({
    selector: 'app-alert-modal',
    template: `
    <div *ngIf="isString(config.data.message)">
      <p>{{ config.data.message }}</p>
    </div>
    <div *ngIf="isString(config.data.message) == false">
      <ng-container *ngFor="let item of config.data.message">
        <div class="grid nogutter">
          <div class="col-12 text-sm">
            <span class="text-bold"
              >&nbsp;&nbsp;{{ item.msg | translate }}</span
            >
          </div>
        </div>
      </ng-container>
    </div>

    <br />
    <button
      pButton
      type="button"
      class="p-button-close"
      (click)="close()"
      label="{{'close'|translate}}"
    ></button>
  `,
    standalone: false
})
export class AlertModalComponent {
  errorList: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public metadataService: MetadataService,
    @Inject('message') public data: any
  ) {}

  ngOnInit(): void {
    
  //  console.log("showing modal...")
  }

  close(): void {
    
    let isIFrame = this.metadataService.getIsIFrame();
    if (isIFrame) {
      window.location.href = 'about:blank';
    }
    this.ref.close();
  }

  isString(variable: any): boolean {
    return typeof variable === 'string';
  }
}
