import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertLogsComponent } from './alert-logs.component';

const routes: Routes = [
  {
    path: '',
    component: AlertLogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertLogsRoutingModule {}
