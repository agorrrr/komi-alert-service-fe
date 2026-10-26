import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[allowLeadingZeros][pInputNumber]',
    standalone: false
})
export class AllowLeadingZerosDirective {
  constructor(readonly el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let value = inputElement.value;

    
    if (value !== '0') {
      value = value.replace(/^0+/, '');
    }

    
    inputElement.value = value;
    inputElement.dispatchEvent(new Event('input')); 
  }
}
