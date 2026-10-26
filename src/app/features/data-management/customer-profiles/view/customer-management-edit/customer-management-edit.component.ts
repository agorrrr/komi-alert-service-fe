import {Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AppState} from "../../../../../core/states/app-state";
import {CustomerManagementState} from "../../state/customer-management-state";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-management-edit',
  templateUrl: './customer-management-edit.component.html',
  styleUrl: './customer-management-edit.component.scss',
  standalone: false
})
export class CustomerManagementEditComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();

  @Output() cbSuccess: EventEmitter<void> = new EventEmitter<void>()

  formGroup: FormGroup | null = null;
  isFormReady = false;

  constructor(
    readonly appState: AppState,
    readonly state: CustomerManagementState,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  ngAfterViewInit(): void {
    // Ensure form is ready after view initialization
    setTimeout(() => {
      this.isFormReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSubscriptions() {
    this.state.initializeForm();

    this.state.formGroup$
      .pipe(takeUntil(this.destroy$))
      .subscribe(formGroup => {
        this.formGroup = formGroup;
        if (formGroup) {
          // Load form data after form group is available
          this.state.loadForm();
        }
      });
  }

  onSubmit() {
    if (this.formGroup?.invalid) {
      return
    }

    this.formGroup?.markAllAsTouched()

    this.state.onSubmitUpdateAPI()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.cbSuccess.emit()
        },
        error: (error) => {
        }
      });

  }

  maxDate() {
    return new Date()
  }
}
