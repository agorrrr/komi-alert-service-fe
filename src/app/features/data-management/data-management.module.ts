import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import {
  CustomerManagementListComponent
} from "./customer-profiles/view/customer-management-list/customer-management-list.component";
import {
  CustomerManagementDetailComponent
} from "./customer-profiles/view/customer-management-detail/customer-management-detail.component";
import {
  CustomerManagementEditComponent
} from "./customer-profiles/view/customer-management-edit/customer-management-edit.component";
import {Avatar} from "primeng/avatar";
import {Tag} from "primeng/tag";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {
  DashboardCardSummaryComponent
} from "../../shared/component/card/dashboard-card-summary/dashboard-card-summary.component";
import {SharedModule} from "../../shared/shared.module";
import {UIChart} from "primeng/chart";
import {LoadingCircularComponent} from "../../shared/component/loading/loading-circular/loading-circular.component";
import {Message} from "primeng/message";
import {InputGroup} from "primeng/inputgroup";
import {IsFieldInvalidPipe} from "../../shared/pipe/is-field-invalid.pipe";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {DropdownModule} from "primeng/dropdown";
import {OnlyNumberDirective} from "../../shared/directive/only-number.directive";
import {FileUpload} from "primeng/fileupload";
import {ProgressSpinner} from "primeng/progressspinner";
import {TableSelectorComponent} from "../../shared/component/table-selector/table-selector.component";
import {Ripple} from "primeng/ripple";
import {DictionaryListComponent} from "./dictionary/view/dictionary/dictionary-list/dictionary-list.component";
import {
  DictionaryDetailListComponent
} from "./dictionary/view/dictionary-detail/dictionary-detail-list/dictionary-detail-list.component";
import {DictionaryFormComponent} from "./dictionary/view/dictionary/dictionary-form/dictionary-form.component";
import {
  DictionaryDetailFormComponent
} from "./dictionary/view/dictionary-detail/dictionary-detail-form/dictionary-detail-form.component";
import {Textarea} from "primeng/textarea";
import {TableInputComponent} from "../../shared/component/table-input/table-input.component";
import {GenericFormComponent} from "../../shared/component/generic-form/generic-form.component";
import {
  DictionaryDetailFormImportComponent
} from "./dictionary/view/dictionary-detail/dictionary-detail-form-import/dictionary-detail-form-import.component";


@NgModule({
  declarations: [
    DictionaryListComponent,
    DictionaryFormComponent,
    DictionaryDetailListComponent,
    DictionaryDetailFormComponent,
    DictionaryDetailFormImportComponent,
    CustomerManagementListComponent,
    CustomerManagementDetailComponent,
    CustomerManagementEditComponent
  ],
    imports: [
        CommonModule,
        DataManagementRoutingModule,
        Avatar,
        Tag,
        Tabs,
        TabList,
        TabPanels,
        Tab,
        TabPanel,
        DashboardCardSummaryComponent,
        SharedModule,
        UIChart,
        LoadingCircularComponent,
        Message,
        InputGroup,
        IsFieldInvalidPipe,
        InputGroupAddon,
        DropdownModule,
        OnlyNumberDirective,
        FileUpload,
        ProgressSpinner,
        TableSelectorComponent,
        Ripple,
        Textarea,
        TableInputComponent,
        GenericFormComponent
    ]
})
export class DataManagementModule { }
