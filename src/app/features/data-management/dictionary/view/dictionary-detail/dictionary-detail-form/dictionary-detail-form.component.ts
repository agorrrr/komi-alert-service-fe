import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormGroup} from "@angular/forms";
import {PreviewQuery} from "../../../model/dictionary";
import {AppState} from "../../../../../../core/states/app-state";
import {AlertService} from "../../../../../../services/alert.service";
import {DictionaryState} from "../../../state/dictionary-state";
import {FieldConfig} from "../../../../../../shared/component/table-input/table-input.component";
import {DictionaryDetailState} from "../../../state/dictionary-detail-state";
import {DictionaryDetail} from "../../../model/dictionary-detail";
import {FormField} from "../../../../../../shared/component/generic-form/generic-form.component";

@Component({
  selector: 'app-dictionary-detail-form',
  templateUrl: './dictionary-detail-form.component.html',
  styleUrl: './dictionary-detail-form.component.scss',
  standalone: false
})
export class DictionaryDetailFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  dictionaryDetail: DictionaryDetail = null;

  formFields: FormField[] = []

  initialData:any = null

  loading = false

  constructor(
    readonly appState: AppState,
    readonly alertSvc: AlertService,
    readonly state: DictionaryDetailState,
  ) {
  }

  ngOnInit(): void {
    this.setupSubscriptions()
  }

  ngOnDestroy(): void {
    this.state.hideModal()
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSubscriptions() {

    this.state.dictionaryDetail$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dictionaryDetail = data
        this.dictionaryDetail?.detail?.columns?.map(v => {
          this.formFields.push({
            name: v?.name,
            type: "text",
            required: true
          })
        })
      });

    this.state.selectedData$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.initialData =  data
      });

    this.state.isLoading$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.loading = data
      })
  }

  onSubmit(formData: any) {
    this.state.onSubmitAPI(formData)
  }

  onCancel() {
    this.state.hideModal()
  }
}
