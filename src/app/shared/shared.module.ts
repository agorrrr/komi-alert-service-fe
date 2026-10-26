import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableHelperComponent } from './component/table-helper/table-helper.component';
import { DetailContentWrapperComponent } from './component/va-maintence/detail-content-wrapper/detail-content-wrapper.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { PickListModule } from 'primeng/picklist';
import { TableHelperLazyComponent } from './component/table-helper-lazy/table-helper-lazy.component';
import { ViewDataFromJsonComponent } from './component/view-data-from-json/view-data-from-json.component';
import { PaginatorModule } from 'primeng/paginator';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ApprovalConfirmationComponent } from './component/approval-confirmation/approval-confirmation/approval-confirmation.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { PanelModule } from 'primeng/panel';
import { TableFromJsonBulkComponent } from './component/table-from-json-bulk/table-from-json-bulk.component';
import { TableFromJsonComponent } from './component/table-from-json/table-from-json.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BlockUIModule } from 'primeng/blockui';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DetailWrapperComponent } from './component/va-maintence/detail-wrapper/detail-wrapper.component';
import { TableHelperBulkComponent } from './component/table-helper-bulk/table-helper-bulk.component';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { PlusIcon } from 'primeng/icons';
import { TabsModule } from 'primeng/tabs';
import { ViewDataComponent } from './component/view-data/view-data.component';
import { ViewDataFormattedComponent } from './component/view-data-formatted/view-data-formatted.component';
import { Badge } from 'primeng/badge';
import { Ripple } from 'primeng/ripple';
import { Skeleton } from 'primeng/skeleton';
import { Textarea } from 'primeng/textarea';
import { DashboardCardSummaryComponent } from './component/card/dashboard-card-summary/dashboard-card-summary.component';
import { UIChart } from 'primeng/chart';
import { Popover } from 'primeng/popover';
import { TableHelperReportComponent } from './component/table-helper-report/table-helper-report.component';

import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    TableHelperComponent,
    TableHelperLazyComponent,
    DetailContentWrapperComponent,
    ApprovalConfirmationComponent,
    ViewDataFromJsonComponent,
    TableFromJsonBulkComponent,
    TableFromJsonComponent,
    DetailWrapperComponent,
    TableHelperReportComponent,
    TableHelperBulkComponent,
    ViewDataComponent,
    ViewDataFormattedComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    SelectButtonModule,
    TagModule,
    DividerModule,
    PickListModule,
    PaginatorModule,
    DatePickerModule,
    InputTextModule,
    ReactiveFormsModule,
    TabMenuModule,
    PanelModule,
    ProgressBarModule,
    DialogModule,
    AutoCompleteModule,
    RadioButtonModule,
    BlockUIModule,
    KeyFilterModule,
    CheckboxModule,
    MultiSelectModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    PlusIcon,
    TabsModule,
    Badge,
    Ripple,
    Skeleton,
    Textarea,
    DashboardCardSummaryComponent,
    UIChart,
    Popover,
    DatePipe,
    CurrencyPipe,
    TooltipModule,
  ],
  providers: [CurrencyPipe, DatePipe],
  exports: [
    TableHelperComponent,
    DetailContentWrapperComponent,
    ViewDataComponent,
    ViewDataFormattedComponent,
    TableHelperLazyComponent,
    ApprovalConfirmationComponent,
    ViewDataFromJsonComponent,
    TableFromJsonBulkComponent,
    TableFromJsonComponent,
    DetailWrapperComponent,
    TableHelperBulkComponent,
    TableHelperReportComponent,
    CommonModule,
    TranslateModule,
    FormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    SelectButtonModule,
    TagModule,
    DividerModule,
    PickListModule,
    PaginatorModule,
    DatePickerModule,
    InputTextModule,
    ReactiveFormsModule,
    TabMenuModule,
    PanelModule,
    ProgressBarModule,
    DialogModule,
    AutoCompleteModule,
    RadioButtonModule,
    BlockUIModule,
    KeyFilterModule,
    MultiSelectModule,
    TabsModule,
    TooltipModule,
  ],
})
export class SharedModule {}
