import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AppState } from '../../../../../../core/states/app-state';
import { DictionaryState } from '../../../state/dictionary-state';
import { FieldConfig } from '../../../../../../shared/component/table-input/table-input.component';
import { channelJson } from '../../../../../../core/base/constants';
import { AlertService } from '../../../../../../services/alert.service';
import { PreviewQuery } from '../../../model/dictionary';

@Component({
  selector: 'app-dictionary-form',
  templateUrl: './dictionary-form.component.html',
  styleUrl: './dictionary-form.component.scss',
  standalone: false,
})
export class DictionaryFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  formGroup: FormGroup = new FormGroup({});

  previewQuery: PreviewQuery = null;

  countIgniteTable: number = 0;

  initialColumns: any[] = [];

  loading = false;

  constructor(
    readonly appState: AppState,
    readonly alertSvc: AlertService,
    readonly state: DictionaryState,
  ) {}

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.state.hideModal();
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSubscriptions() {
    this.state.formGroup$
      .pipe(takeUntil(this.destroy$))
      .subscribe((formGroup) => {
        this.formGroup = formGroup;
      });

    this.state.previewQuery$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.previewQuery = data;
      });

    this.state.isLoading$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.loading = data;
    });

    this.state.countIgniteTable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.countIgniteTable = data;
      });

    this.state.columns$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.initialColumns = data;
    });

    if (!this.state.isCreationMode && this.state.chosenType !== 'CALCULATION') {
      this.state.countAPI();
      this.state.getColumnsAPI();
    }
  }

  onSubmit() {
    const useTableColumns = this.state.chosenType !== 'CALCULATION';

    if (useTableColumns && !this.isTableColumnsValid()) return;

    if (this.formGroup && this.formGroup.valid) {
      this.state.onSubmitAPI();
    } else {
      this.state.markFormGroupTouched();
    }
  }

  isTableColumnsValid(): boolean {
    const arr: any[] = this.formGroup.value.tableColumns;

    if (!this.canUpdateDDL) {
      return true;
    }

    if (arr?.length === 0) {
      this.alertSvc.showWarnCustom('Fill at least 1 columns');
      return false;
    }

    let countPrimaryKey = 0;

    let haveEmptyField = false;

    arr?.map((v) => {
      if (v.primaryKey === true) {
        countPrimaryKey++;
      }

      if (v.name === '' || v.type === '') haveEmptyField = true;
    });

    if (haveEmptyField) {
      this.alertSvc.showWarnCustom('Fill Required Field');
      return false;
    }

    if (countPrimaryKey == 0) {
      this.alertSvc.showWarnCustom('Choose At Least 1 Primary Key');
      return false;
    }

    if (countPrimaryKey > 1) {
      this.alertSvc.showWarnCustom('Only 1 Primary Key Allowed');
      return false;
    }

    return true;
  }

  onCancel() {
    this.state.hideModal();
  }

  onPreview() {
    const query = this.formGroup.value?.queryScript || '';
    this.state.getPreviewQueryAPI(query);
  }

  fields: FieldConfig[] = [
    { key: 'name', type: 'text', required: true },
    {
      key: 'type',
      type: 'dropdown',
      required: true,
      dropdownOptions: ['VARCHAR', 'INTEGER', 'DOUBLE'],
    },
    { key: 'primaryKey', type: 'checkbox', required: false },
    { key: 'notNull', type: 'checkbox', required: false },
  ];

  handleDataChange(data: any[]) {
    this.formGroup.patchValue({
      tableColumns: data,
    });
  }

  canRenderCalculation() {
    return this.state.chosenType === 'CALCULATION';
  }

  canSubmit() {
    return (
      this.loading === false &&
      this.formGroup.valid &&
      (this.formGroup.value.type === 'CALCULATION'
        ? this.previewQuery?.columns?.length > 0
        : true)
    );
  }

  get canUpdateDDL() {
    return this.countIgniteTable == 0;
  }

  protected readonly channelJson = channelJson;
}
