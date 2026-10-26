import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CustomerManagementListComponent
} from "./customer-profiles/view/customer-management-list/customer-management-list.component";
import {
  CustomerManagementDetailComponent
} from "./customer-profiles/view/customer-management-detail/customer-management-detail.component";
import {DictionaryListComponent} from "./dictionary/view/dictionary/dictionary-list/dictionary-list.component";
import {
  DictionaryDetailListComponent
} from "./dictionary/view/dictionary-detail/dictionary-detail-list/dictionary-detail-list.component";

const routes: Routes = [
  {
    path: 'customer-profiles',
    children:[
      {path: '', component: CustomerManagementListComponent},
      {path: 'detail', component: CustomerManagementDetailComponent}
    ]
  },
  {
    path: 'dictionary',
    children:[
      {path: '', component: DictionaryListComponent},
      {path: 'detail', component: DictionaryDetailListComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule { }
