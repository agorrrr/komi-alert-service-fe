import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Destination,
  DestinationManagementService,
  CreateDestinationDTO,
  UpdateDestinationDTO,
} from '../service/destination-management.service';
import { AlertService } from '../../../services/alert.service';

export interface PaginationData {
  first: number;
  page: number;
  rows: number;
  totalRecord: number;
}

@Injectable({
  providedIn: 'root',
})
export class DestinationManagementState {
  private isLoadingState = new BehaviorSubject<boolean>(false);
  private destinationsState = new BehaviorSubject<Destination[]>([]);
  private selectedDataState = new BehaviorSubject<Destination | null>(null);
  private paginationDataState = new BehaviorSubject<PaginationData>({
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0,
  });

  // Form-related state
  private formGroupState = new BehaviorSubject<FormGroup | null>(null);
  private isCreationModeState = new BehaviorSubject<boolean>(true);
  private formLoadingState = new BehaviorSubject<boolean>(false);

  // Filter form state
  private filterFormGroupState = new BehaviorSubject<FormGroup | null>(null);

  // Public observables
  destinations$ = this.destinationsState.asObservable();
  paginationData$ = this.paginationDataState.asObservable();
  selectedData$ = this.selectedDataState.asObservable();
  isLoading$ = this.isLoadingState.asObservable();
  formGroup$ = this.formGroupState.asObservable();
  filterFormGroup$ = this.filterFormGroupState.asObservable();

  // Destination type options
  destinationTypes = [
    { label: 'Telegram', value: 'telegram' },
    { label: 'Slack', value: 'slack' },
    { label: 'Email', value: 'email' },
    { label: 'Webhook', value: 'webhook' },
  ];

  constructor(
    private svc: DestinationManagementService,
    private fb: FormBuilder,
    private alertSvc: AlertService,
  ) {}

  // API Methods
  getDestinationsAPI() {
    this.isLoadingState.next(true);
    const { rows, page } = this.paginationDataState.value;

    this.svc.getAll(rows.toString(), page.toString()).subscribe({
      next: ({ destinations, total }) => {
        this.destinationsState.next(destinations);
        this.paginationDataState.next({
          ...this.paginationDataState.value,
          totalRecord: total,
        });
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error loading destinations:', err);
        this.isLoadingState.next(false);
      },
    });
  }

  createDestinationAPI(): Observable<any> {
    this.formLoadingState.next(true);

    const formGroup = this.formGroupState.value;
    if (!formGroup || formGroup.invalid) {
      this.formLoadingState.next(false);
      throw new Error('Form is invalid');
    }

    const formValue = formGroup.value;
    const { name, type } = formValue;

    // Build config based on type
    let config: any = {};

    switch (type) {
      case 'telegram':
        config = {
          chat_id: formValue.chat_id,
          thread_id: formValue.thread_id || undefined,
          bot_token: formValue.bot_token || undefined,
        };
        break;
      case 'slack':
        config = {
          webhook_url: formValue.webhook_url,
          channel_name: formValue.channel_name || undefined,
          slack_token: formValue.slack_token || undefined,
        };
        break;
      case 'email':
        config = {
          recipient_emails: formValue.recipient_emails,
          subject_template: formValue.subject_template || undefined,
        };
        break;
      case 'webhook':
        config = {
          url: formValue.url,
          http_method: formValue.http_method || 'POST',
          headers: formValue.headers || undefined,
          auth_type: formValue.auth_type || undefined,
          auth_token: formValue.auth_token || undefined,
        };
        break;
    }

    const payload: CreateDestinationDTO = {
      name,
      type,
      config,
    };

    return new Observable((observer) => {
      this.svc.create(payload).subscribe({
        next: () => {
          this.alertSvc.showSuccessCustom('Destination created successfully');
          this.getDestinationsAPI();
          this.formLoadingState.next(false);
          observer.next({});
          observer.complete();
        },
        error: (error) => {
          this.formLoadingState.next(false);
          this.alertSvc.showErrorCustom(
            error?.error?.message || 'Failed to create destination',
          );
          observer.error(error);
        },
      });
    });
  }

  updateDestinationAPI(): Observable<any> {
    this.formLoadingState.next(true);

    const formGroup = this.formGroupState.value;
    const selectedData = this.selectedDataState.value;

    if (!formGroup || formGroup.invalid || !selectedData) {
      this.formLoadingState.next(false);
      throw new Error('Form is invalid or no destination selected');
    }

    const formValue = formGroup.value;
    const { name, type } = formValue;

    // Build config based on type
    let config: any = {};

    switch (type) {
      case 'telegram':
        config = {
          chat_id: formValue.chat_id,
          thread_id: formValue.thread_id || undefined,
          bot_token: formValue.bot_token || undefined,
        };
        break;
      case 'slack':
        config = {
          webhook_url: formValue.webhook_url,
          channel_name: formValue.channel_name || undefined,
          slack_token: formValue.slack_token || undefined,
        };
        break;
      case 'email':
        config = {
          recipient_emails: formValue.recipient_emails,
          subject_template: formValue.subject_template || undefined,
        };
        break;
      case 'webhook':
        config = {
          url: formValue.url,
          http_method: formValue.http_method || 'POST',
          headers: formValue.headers || undefined,
          auth_type: formValue.auth_type || undefined,
          auth_token: formValue.auth_token || undefined,
        };
        break;
    }

    const payload: UpdateDestinationDTO = {
      name,
      type,
      config,
    };

    return new Observable((observer) => {
      this.svc.update(selectedData.id, payload).subscribe({
        next: () => {
          this.alertSvc.showSuccessCustom('Destination updated successfully');
          this.getDestinationsAPI();
          this.formLoadingState.next(false);
          observer.next({});
          observer.complete();
        },
        error: (error) => {
          this.formLoadingState.next(false);
          this.alertSvc.showErrorCustom(
            error?.error?.message || 'Failed to update destination',
          );
          observer.error(error);
        },
      });
    });
  }

  deleteDestinationAPI() {
    this.isLoadingState.next(true);
    const selectedData = this.selectedDataState.value;

    if (!selectedData) {
      this.isLoadingState.next(false);
      return;
    }

    this.svc.delete(selectedData.id).subscribe({
      next: () => {
        this.alertSvc.showSuccessCustom('Destination deleted successfully');
        this.getDestinationsAPI();
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error deleting destination:', err);
        this.alertSvc.showErrorCustom(
          err?.error?.message || 'Failed to delete destination',
        );
        this.isLoadingState.next(false);
      },
    });
  }

  // Form Methods
  initializeForm(): void {
    const formGroup = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      type: [null, Validators.required],
      // Telegram fields
      chat_id: [null],
      thread_id: [null],
      bot_token: [null],
      // Slack fields
      webhook_url: [null],
      channel_name: [null],
      slack_token: [null],
      // Email fields
      recipient_emails: [null],
      subject_template: [null],
      // Webhook fields
      url: [null],
      http_method: ['POST'],
      headers: [null],
      auth_type: [null],
      auth_token: [null],
    });

    // Listen to type changes to update validators
    formGroup.get('type')?.valueChanges.subscribe((type) => {
      this.updateFormValidators(formGroup, type);
    });

    this.formGroupState.next(formGroup);
  }

  private updateFormValidators(formGroup: FormGroup, type: string): void {
    // Clear all validators first
    const fields = [
      'chat_id',
      'thread_id',
      'bot_token',
      'webhook_url',
      'channel_name',
      'slack_token',
      'recipient_emails',
      'subject_template',
      'url',
      'http_method',
      'headers',
      'auth_type',
      'auth_token',
    ];

    fields.forEach((field) => {
      formGroup.get(field)?.clearValidators();
      // DON'T set to null here - only clear validators
      formGroup.get(field)?.updateValueAndValidity({ emitEvent: false });
    });

    // Set validators based on type
    switch (type) {
      case 'telegram':
        formGroup.get('chat_id')?.setValidators([Validators.required]);
        break;
      case 'slack':
        formGroup.get('webhook_url')?.setValidators([Validators.required]);
        break;
      case 'email':
        formGroup.get('recipient_emails')?.setValidators([Validators.required]);
        break;
      case 'webhook':
        formGroup.get('url')?.setValidators([Validators.required]);
        formGroup.get('http_method')?.setValidators([Validators.required]);
        // Only set default if it's null/empty
        if (!formGroup.get('http_method')?.value) {
          formGroup.get('http_method')?.setValue('POST');
        }
        break;
    }

    // Update validity
    fields.forEach((field) => {
      formGroup.get(field)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  loadForm() {
    const formGroup = this.formGroupState.value;
    const selectedData = this.selectedDataState.value;

    if (!formGroup || !selectedData) {
      return;
    }

    const config: any = selectedData.config || {};

    const formValues: any = {
      id: selectedData.id,
      name: selectedData.name,
      type: selectedData.type,
    };

    // Load type-specific config fields
    switch (selectedData.type) {
      case 'telegram':
        formValues.chat_id = config.chat_id || null;
        formValues.thread_id = config.thread_id || null;
        formValues.bot_token = config.bot_token || null;
        break;
      case 'slack':
        formValues.webhook_url = config.webhook_url || null;
        formValues.channel_name = config.channel_name || null;
        formValues.slack_token = config.slack_token || null;
        break;
      case 'email':
        formValues.recipient_emails = config.recipient_emails || null;
        formValues.subject_template = config.subject_template || null;
        break;
      case 'webhook':
        formValues.url = config.url || null;
        formValues.http_method = config.http_method || 'POST';
        formValues.headers = config.headers || null;
        formValues.auth_type = config.auth_type || null;
        formValues.auth_token = config.auth_token || null;
        break;
    }

    // Patch the form WITHOUT triggering the type valueChanges
    formGroup.patchValue(formValues, { emitEvent: false });

    // Now manually update validators for the selected type
    this.updateFormValidators(formGroup, selectedData.type);
  }

  initializeFilterForm(): void {
    const filterFormGroup = this.fb.group({
      name: [null],
      type: [null],
    });
    this.filterFormGroupState.next(filterFormGroup);
  }

  // loadForm() {
  //   const formGroup = this.formGroupState.value;
  //   const selectedData = this.selectedDataState.value;

  //   console.log('loadForm called with selectedData:', selectedData);

  //   if (!formGroup || !selectedData) {
  //     console.log('Form or selectedData is null');
  //     return;
  //   }

  //   const config: any = selectedData.config || {};

  //   const formValues: any = {
  //     id: selectedData.id,
  //     name: selectedData.name,
  //     type: selectedData.type,
  //   };

  //   // Load type-specific config fields
  //   switch (selectedData.type) {
  //     case 'telegram':
  //       formValues.chat_id = config.chat_id || null;
  //       formValues.thread_id = config.thread_id || null;
  //       formValues.bot_token = config.bot_token || null;
  //       break;
  //     case 'slack':
  //       formValues.webhook_url = config.webhook_url || null;
  //       formValues.channel_name = config.channel_name || null;
  //       formValues.slack_token = config.slack_token || null;
  //       break;
  //     case 'email':
  //       formValues.recipient_emails = config.recipient_emails || null;
  //       formValues.subject_template = config.subject_template || null;
  //       break;
  //     case 'webhook':
  //       formValues.url = config.url || null;
  //       formValues.http_method = config.http_method || 'POST';
  //       formValues.headers = config.headers || null;
  //       formValues.auth_type = config.auth_type || null;
  //       formValues.auth_token = config.auth_token || null;
  //       break;
  //   }

  //   console.log('Patching form with values:', formValues);
  //   formGroup.patchValue(formValues);
  //   console.log('Form values after patch:', formGroup.value);
  // }

  resetForm() {
    const formGroup = this.formGroupState.value;
    if (formGroup) {
      formGroup.reset({
        http_method: 'POST', // Set default for webhook
      });
    }
  }

  // State Management Methods
  setPagination(newPaginationData: Partial<PaginationData>) {
    const updatedPagination = {
      ...this.paginationDataState.value,
      ...newPaginationData,
    };

    this.paginationDataState.next(updatedPagination);
    this.getDestinationsAPI();
  }

  setSelectedData(destination: Destination | null) {
    this.selectedDataState.next(destination);
  }

  setCreationMode(isCreation: boolean) {
    this.isCreationModeState.next(isCreation);
    if (isCreation) {
      this.resetForm();
    }
  }

  get isCreationMode(): boolean {
    return this.isCreationModeState.value;
  }

  get isFormLoading(): boolean {
    return this.formLoadingState.value;
  }

  enableForm() {
    this.formGroupState.value?.enable();
  }

  disableForm() {
    this.formGroupState.value?.disable();
  }
}
