import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormGroup} from "@angular/forms";
import {WhitelistAccount, WhitelistAccState} from "../../state/whitelist-acc-state";
import {BlacklistAccount, BlacklistAccState} from "../../../blacklist/state/blacklist-acc-state";

@Component({
  selector: 'app-whitelist-acc-form',
  templateUrl: './whitelist-acc-form.component.html',
  styleUrl: './whitelist-acc-form.component.scss',
  standalone: false
})
export class WhitelistAccFormComponent  implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  acceptedFormat = '.csv'
  maxFileSize = 2000000

  formGroup: FormGroup | null = null;
  selectedData: WhitelistAccount | null = null;
  isCreationMode = true;
  isBulkMode = false;

  @Output()
  cbCloseModal = new EventEmitter()

  constructor(private blacklistState: WhitelistAccState) {
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
      if (!this.formGroup.get('whitelistFile')) {
        this.formGroup.addControl('blacklistFile', this.blacklistState['fb'].control(null));
      }
      // Clear account number when switching to bulk
      this.formGroup.get('newAccountNo')?.setValue('');
    } else {
      // Clear file when switching to single
      this.formGroup.get('whitelistFile')?.setValue(null);
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
