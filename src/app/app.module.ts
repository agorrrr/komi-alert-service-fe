import { environment } from '../environments/environment';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  LocationStrategy,
  NgOptimizedImage,
  PathLocationStrategy,
} from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserModule,
  REMOVE_STYLES_ON_COMPONENT_DESTROY,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';

import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DialogService } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';

import { PasswordModule } from 'primeng/password';
import { HomeComponent } from './features/home/home.component';
import { NobarlayoutComponent } from './layout/nobarlayout/nobarlayout.component';
import { SidebarlayoutComponent } from './layout/sidebarlayout/sidebarlayout.component';
import { TopbarlayoutComponent } from './layout/topbarlayout/topbarlayout.component';

import { EditorModule } from 'primeng/editor';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';

import { ListboxModule } from 'primeng/listbox';
import { PickListModule } from 'primeng/picklist';
import { TabMenuModule } from 'primeng/tabmenu';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BlockUIModule } from 'primeng/blockui';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { AlertModalComponent } from './services/modal-service/AlertModalComponent';
import { AlertModalService } from './services/modal-service/AlertModalService';

import { ReportsFormComponent } from './shared/component/reports/reports-form/reports-form.component';
import { TransactionTableComponent } from './shared/component/va-transaction-status/transaction-table/transaction-table.component';

import { TableReportsComponent } from './shared/component/reports/table-reports/table-reports.component';

import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { InputMaskModule } from 'primeng/inputmask';
import { TimelineModule } from 'primeng/timeline';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { UnauthorizePageComponent } from './layout/unauthorize-page/unauthorize-page.component';

import { AllowLeadingZerosDirective } from './shared/directive/allow-leading-zeros.directive';

import { SidebarlayoutrefactorComponent } from './layout/sidebarlayoutrefactor/sidebarlayoutrefactor.component';

import { ChartModule } from 'primeng/chart';
import { SliderModule } from 'primeng/slider';
import { SigninPageComponent } from './layout/signin-page/signin-page.component';
import { SharedModule } from './shared/shared.module';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { definePreset } from '@primeng/themes';
import Lara from '@primeng/themes/lara';
import { providePrimeNG } from 'primeng/config';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AuthInterceptor } from './core/interceptor/interceptor';
import { DashboardCardSummaryComponent } from './shared/component/card/dashboard-card-summary/dashboard-card-summary.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
  },
});

@NgModule({
  declarations: [
    AppComponent,
    SidebarlayoutComponent,
    TopbarlayoutComponent,
    NobarlayoutComponent,
    HomeComponent,
    AllowLeadingZerosDirective,
    TransactionTableComponent,
    ReportsFormComponent,
    TableReportsComponent,
    AlertModalComponent,
    DashboardComponent,
    UnauthorizePageComponent,
    SidebarlayoutrefactorComponent,
    SigninPageComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CheckboxModule,
    FieldsetModule,
    CommonModule,
    PasswordModule,
    InputMaskModule,
    AccordionModule,
    ButtonModule,
    BreadcrumbModule,
    MenuModule,
    ProgressSpinnerModule,
    PanelModule,
    PanelMenuModule,
    DrawerModule,
    MenubarModule,
    SplitButtonModule,
    AvatarModule,
    AvatarGroupModule,
    SkeletonModule,
    ImageModule,
    DividerModule,
    InputTextModule,
    TabViewModule,
    DataViewModule,
    ToastModule,
    DialogModule,
    FileUploadModule,
    // DynamicDialogModule,
    TableModule,
    RadioButtonModule,
    InputNumberModule,
    MultiSelectModule,
    KeyFilterModule,
    TagModule,
    TimelineModule,
    AutoCompleteModule,
    TooltipModule,
    ChipModule,
    SelectButtonModule,
    CardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    EditorModule,
    CardModule,
    SelectModule,
    ConfirmDialogModule,
    DatePickerModule,
    ListboxModule,
    BadgeModule,
    // ChipsModule,
    PickListModule,
    TabMenuModule,
    BlockUIModule,
    PaginatorModule,
    ToggleSwitchModule,
    ChartModule,
    SliderModule,
    TranslateModule,
    InputGroupModule,
    InputGroupAddonModule,
    NgOptimizedImage,
    DashboardCardSummaryComponent,
  ],
  exports: [AllowLeadingZerosDirective],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false || 'none',
          // cssLayer: {
          //     name: 'primeng',
          //     order: 'app-styles, primeng, another-css-library'
          // }
        },
      },
    }),
    DecimalPipe,
    ConfirmationService,
    MessageService,
    DialogService,
    AlertModalService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'message', useClass: AlertModalService },
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: REMOVE_STYLES_ON_COMPONENT_DESTROY, useValue: false },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {
  constructor() {
    console.log(`[AppModule] Application started with environment: ${environment.environmentName} (Production: ${environment.production})`);
  }
}
