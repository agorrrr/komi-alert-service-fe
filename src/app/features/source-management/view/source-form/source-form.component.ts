import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SourceManagementState } from '../../state/source-management-state';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-source-form',
  templateUrl: './source-form.component.html',
  styleUrls: ['./source-form.component.scss'],
  standalone: false,
})
export class SourceFormComponent implements OnInit {
  @Output() successEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  formGroup: FormGroup;

  constructor(readonly state: SourceManagementState) {
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    this.state.formGroup$.subscribe((fg) => {
      if (fg) {
        this.formGroup = fg;
      }
    });
  }


  onSubmit() {
    if (this.state.isCreationMode) {
      this.state.createSourceAPI().subscribe({
        next: () => {
          this.successEvent.emit();
        },
      });
    } else {
      this.state.updateSourceAPI().subscribe({
        next: () => {
          this.successEvent.emit();
        },
      });
    }
  }

  onCancel() {
    this.cancelEvent.emit();
  }
}
