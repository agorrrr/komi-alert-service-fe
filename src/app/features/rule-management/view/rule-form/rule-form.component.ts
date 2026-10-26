import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RuleManagementState } from '../../state/rule-management-state';
import { FormGroup } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface FilterCondition {
  field: string;
  values: string[];
}

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html',
  styleUrls: ['./rule-form.component.scss'],
  standalone: false,
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ height: '0', opacity: 0, overflow: 'hidden' }),
        ),
      ]),
    ]),
  ],
})
export class RuleFormComponent implements OnInit {
  @Output() successEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  formGroup: FormGroup;
  isAdvancedOpen = false;

  // Filter Criteria UI
  filterConditions: FilterCondition[] = [];

  // Message Template Preview
  showPreview = false;
  previewHtml = '';

  private hasInitializedFilters = false;

  constructor(readonly state: RuleManagementState) {
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    this.state.formGroup$.subscribe((fg) => {
      if (fg) {
        this.formGroup = fg;
        if (!this.state.isCreationMode) {
          const filterValue = fg.get('filter_criteria')?.value;
          const templateValue = fg.get('message_template')?.value;

          console.log(
            'Filter value from form:',
            filterValue,
            'Type:',
            typeof filterValue,
          );

          // Parse existing filter criteria only once when form is loaded
          if (filterValue && !this.hasInitializedFilters) {
            this.hasInitializedFilters = true;
            this.parseFilterCriteria(filterValue);
          }

          if (filterValue || templateValue) {
            this.isAdvancedOpen = true;
          }
        }
      }
    });
  }

  toggleAdvanced() {
    this.isAdvancedOpen = !this.isAdvancedOpen;
  }

  // Filter Criteria Methods
  parseFilterCriteria(input: any) {
    console.log(
      'parseFilterCriteria called with:',
      input,
      'Type:',
      typeof input,
    );

    // Store the current conditions in case we need to restore them
    const previousConditions = [...this.filterConditions];

    try {
      let parsed: any = input;

      // Handle string input - may need multiple parses for double-encoded JSON
      if (typeof input === 'string') {
        if (input.trim() === '') {
          return;
        }

        // Keep parsing while we have a string (handles double/triple encoded JSON)
        while (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
      } else if (typeof input === 'object' && input !== null) {
        parsed = input;
      } else {
        console.warn('Invalid filter criteria input type:', typeof input);
        return;
      }

      console.log(
        'Final parsed value:',
        parsed,
        'Type:',
        typeof parsed,
        'Is array:',
        Array.isArray(parsed),
      );

      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        console.warn('Parsed filter criteria is not a valid object:', parsed);
        return;
      }

      // Successfully parsed, now convert to filter conditions
      this.filterConditions = Object.entries(parsed).map(([field, values]) => ({
        field,
        values: Array.isArray(values) ? values : [String(values)],
      }));

      console.log(
        'Successfully parsed filter conditions:',
        this.filterConditions,
      );
    } catch (e) {
      console.error('Error parsing filter criteria:', e, 'Input:', input);
      // Restore previous conditions if parsing failed
      this.filterConditions = previousConditions;
    }
  }

  addFilterCondition() {
    this.filterConditions.push({ field: '', values: [''] });
  }

  removeFilterCondition(index: number) {
    this.filterConditions.splice(index, 1);
    this.updateFilterCriteriaFormControl();
  }

  addValue(conditionIndex: number) {
    this.filterConditions[conditionIndex].values.push('');
  }

  removeValue(conditionIndex: number, valueIndex: number) {
    this.filterConditions[conditionIndex].values.splice(valueIndex, 1);
    if (this.filterConditions[conditionIndex].values.length === 0) {
      this.filterConditions[conditionIndex].values.push('');
    }
    this.updateFilterCriteriaFormControl();
  }

  onFieldChange(index: number) {
    this.updateFilterCriteriaFormControl();
  }

  onValueChange(conditionIndex: number, valueIndex: number) {
    this.updateFilterCriteriaFormControl();
  }

  updateFilterCriteriaFormControl() {
    // Filter out empty conditions and values
    const validConditions = this.filterConditions.filter(
      (c) => c.field && c.values.some((v) => v.trim()),
    );

    if (validConditions.length === 0) {
      this.formGroup.get('filter_criteria')?.setValue(null);
      return;
    }

    const filterObject: { [key: string]: string[] } = {};
    validConditions.forEach((condition) => {
      const validValues = condition.values.filter((v) => v.trim());
      if (validValues.length > 0) {
        filterObject[condition.field] = validValues;
      }
    });

    // Set as object, not string
    this.formGroup.get('filter_criteria')?.setValue(filterObject);
  }

  // Message Template Preview Methods
  togglePreview() {
    this.showPreview = !this.showPreview;
    if (this.showPreview) {
      this.generatePreview();
    }
  }

  generatePreview() {
    const template = this.formGroup.get('message_template')?.value || '';

    let processed = template.replace(/\\n/g, '<br>');

    this.previewHtml = processed;
  }

  onSubmit() {
    if (this.state.isCreationMode) {
      this.state.createRuleAPI().subscribe({
        next: () => {
          this.successEvent.emit();
        },
      });
    } else {
      this.state.updateRuleAPI().subscribe({
        next: () => {
          this.successEvent.emit();
        },
      });
    }
  }

  onCancel() {
    this.cancelEvent.emit();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
