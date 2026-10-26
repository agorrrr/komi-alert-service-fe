import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Routing
import { DestinationManagementRoutingModule } from './destination-management-routing.module';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

// Shared
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { DestinationListComponent } from './view/destination-list/destination-list.component';
import { DestinationFormComponent } from './view/destination-form/destination-form.component';

@NgModule({
  declarations: [DestinationListComponent, DestinationFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DestinationManagementRoutingModule,
    SharedModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    PasswordModule,
    ButtonModule,
  ],
})
export class DestinationManagementModule {}
