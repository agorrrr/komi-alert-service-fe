import { Component, Input, SimpleChanges } from '@angular/core';
import { JsonTransformerServiceService } from 'src/app/services/json-transformer/json-transformer-service.service';

@Component({
    selector: 'app-detail-wrapper',
    templateUrl: './detail-wrapper.component.html',
    styleUrls: ['./detail-wrapper.component.scss'],
    standalone: false
})
export class DetailWrapperComponent {
  @Input() title: string = '';
  @Input() panelHeader: string = '';
  @Input() detailContent: any;

  constructor(readonly jsonTransformerService: JsonTransformerServiceService) {}
  ngOnInit(): void {
    this.detailContent = this.jsonTransformerService.transformJsonArray(
      this.detailContent
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['detailContent'] && !changes['detailContent'].firstChange) {
      this.detailContent = this.jsonTransformerService.transformJsonArray(
        this.detailContent
      );
    }
  }
}
