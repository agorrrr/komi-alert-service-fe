import {Component, Input} from '@angular/core';
import {DividerModule} from "primeng/divider";
import {TagModule} from "primeng/tag";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule, NgIf} from "@angular/common";

@Component({
    selector: 'app-detail-content-wrapper',
    templateUrl: './detail-content-wrapper.component.html',
    imports: [
        DividerModule,
        TagModule,
        TranslateModule,
        NgIf,
    ],
    styleUrls: ['./detail-content-wrapper.component.scss']
})
export class DetailContentWrapperComponent {
  @Input() data: any;

  itemsPerColumn: any;
}
