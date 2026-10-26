import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertLogsComponent } from './alert-logs.component';
import { AlertLogsRoutingModule } from './alert-logs-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AlertLogsComponent],
  imports: [CommonModule, AlertLogsRoutingModule, SharedModule],
})
export class AlertLogsModule {}
