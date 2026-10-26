import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Routing;

import { RuleManagementRoutingModule } from './rule-management-routing.module';
// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';

// Shared
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { RuleListComponent } from './view/rule-list/rule-list.component';
import { RuleFormComponent } from './view/rule-form/rule-form.component';

@NgModule({
  declarations: [RuleListComponent, RuleFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RuleManagementRoutingModule,
    SharedModule,
    DialogModule,
    InputTextModule,
    InputTextarea,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
  ],
})
export class RuleManagementModule {}
