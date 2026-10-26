import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Routing
import { UserManagementRoutingModule } from './user-management-routing.module';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule, Button } from 'primeng/button';

// Shared
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { UserListComponent } from './view/user-list/user-list.component';
import { UserFormComponent } from './view/user-form/user-form.component';

@NgModule({
  declarations: [UserListComponent, UserFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserManagementRoutingModule,
    SharedModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    Button,
  ],
})
export class UserManagementModule {}
