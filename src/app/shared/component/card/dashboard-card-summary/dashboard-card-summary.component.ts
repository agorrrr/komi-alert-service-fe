import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-card-summary',
  imports: [],
  templateUrl: './dashboard-card-summary.component.html',
  styleUrl: './dashboard-card-summary.component.scss',
  standalone: true
})
export class DashboardCardSummaryComponent {
  @Input() label: string = 'Total Items';
  @Input() count: number | string = 0;
  @Input() icon: string = "pi-check";
  @Input() fontSize :string= '1rem'
  @Input() fontWeight :string= 'bold'

}
