import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceListComponent } from './view/source-list/source-list.component';

const routes: Routes = [
  {
    path: '',
    component: SourceListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SourceManagementRoutingModule {}
