import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Routing
import { SourceManagementRoutingModule } from './source-management-routing.module';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

// Shared
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { SourceListComponent } from './view/source-list/source-list.component';
import { SourceFormComponent } from './view/source-form/source-form.component';

@NgModule({
  declarations: [SourceListComponent, SourceFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SourceManagementRoutingModule,
    SharedModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
})
export class SourceManagementModule {}
