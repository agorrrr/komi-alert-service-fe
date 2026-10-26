import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';
import {DictionaryDetailState} from "../../../state/dictionary-detail-state";
import {DictionaryDetailService} from "../../../service/dictionary-detail.service";

@Component({
  selector: 'app-dictionary-detail-form-import',
  templateUrl: './dictionary-detail-form-import.component.html',
  styleUrl: './dictionary-detail-form-import.component.scss',
  standalone: false
})
export class DictionaryDetailFormImportComponent implements OnInit,OnDestroy {
  private destroy$ = new Subject<void>();
  loading: boolean = false;

  formGroup: FormGroup = new FormGroup({});

  acceptedFormat = '.csv'
  maxFileSize = 2000000

  constructor(
    private state: DictionaryDetailState,
    private svc: DictionaryDetailService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm()
    this.setupSubscriptions()
  }

  ngOnDestroy(): void {
    this.state.hideModal()
    this.destroy$.next();
    this.destroy$.complete();
  }
  setupSubscriptions() {
    this.state.isLoading$.pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.loading = loading;
      });
  }
  initializeForm() {
    this.formGroup = this.fb.group({
      dictionaryFile: null
    })
  }

  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file && this.formGroup) {
      this.formGroup.get('dictionaryFile')?.setValue(file);
    }
  }

  onSubmit() {
    const file = this.formGroup.value.dictionaryFile

    this.state.onSubmitImportAPI(file)
  }

  onDownloadExample() {
    this.state.onDownloadExampleAPI()
  }

  onCancel() {
    this.state.hideModal()
  }

}
