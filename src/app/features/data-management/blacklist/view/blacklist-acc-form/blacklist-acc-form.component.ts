import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {BlacklistAccount, BlacklistAccState} from "../../state/blacklist-acc-state";

@Component({
  selector: 'app-blacklist-acc-form',
  templateUrl: './blacklist-acc-form.component.html',
  styleUrl: './blacklist-acc-form.component.scss',
  standalone: false
})
export class BlacklistAccFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  acceptedFormat = '.csv'
  maxFileSize = 2000000

  formGroup: FormGroup | null = null;
  selectedData: BlacklistAccount | null = null;
  isCreationMode = true;
  isBulkMode = false;

  @Output()
  cbCloseModal = new EventEmitter()

  constructor(private blacklistState: BlacklistAccState) {
  }

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSubscriptions(): void {
    this.blacklistState.initializeForm();

    // Subscribe to form group
    this.blacklistState.formGroup$
      .pipe(takeUntil(this.destroy$))
      .subscribe(formGroup => {
        this.formGroup = formGroup;
        this.setupFormForMode();
      });

    // Subscribe to selected data
    this.blacklistState.selectedData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data) {
          this.selectedData = data;
          this.isCreationMode = false
          this.setupFormForMode();
        }

      });
  }

  private setupFormForMode(): void {
    if (!this.formGroup) return;
    this.isBulkMode = false;
    if (this.formGroup.get('blacklistFile')) {
      this.formGroup.removeControl('blacklistFile');
    }

    // Pre-fill the form with selected data
    if (this.selectedData) {
      this.formGroup.patchValue({
        newAccountNo: this.selectedData.accountNo
      });
    }
  }

  onModeChange(isBulk: boolean): void {
    this.isBulkMode = isBulk;

    if (!this.formGroup) return;

    if (isBulk) {
      // Add file control if it doesn't exist
      if (!this.formGroup.get('blacklistFile')) {
        this.formGroup.addControl('blacklistFile', this.blacklistState['fb'].control(null));
      }
      // Clear account number when switching to bulk
      this.formGroup.get('newAccountNo')?.setValue('');
    } else {
      // Clear file when switching to single
      this.formGroup.get('blacklistFile')?.setValue(null);
    }
  }

  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file && this.formGroup) {
      this.formGroup.get('blacklistFile')?.setValue(file);
    }
  }

  onSubmit(): void {
    if (!this.formGroup?.valid) return;

    if (this.isCreationMode) {
      if (this.isBulkMode) {
        this.blacklistState.createBulkAPI();
      } else {
        this.blacklistState.createAPI();
      }
    } else {
      this.blacklistState.updateAPI();
    }

    this.cbCloseModal.emit()
  }

  get submitButtonLabel(): string {
    if (this.isCreationMode) {
      return this.isBulkMode ? 'Create Bulk' : 'Create';
    }
    return 'Update';
  }

  onCancel() {
    this.cbCloseModal.emit()
  }
}
