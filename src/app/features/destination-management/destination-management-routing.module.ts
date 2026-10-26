import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationListComponent } from './view/destination-list/destination-list.component';

const routes: Routes = [
  {
    path: '',
    component: DestinationListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinationManagementRoutingModule {}
