import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-detail-content-wrapper',
    templateUrl: './detail-content-wrapper.component.html',
    styleUrls: ['./detail-content-wrapper.component.scss'],
    standalone: false
})
export class DetailContentWrapperComponent {
  @Input() data: any;
  @Input() widthLabel: any;
  @Input() widthValue: any;

  itemsPerColumn: any;
}
