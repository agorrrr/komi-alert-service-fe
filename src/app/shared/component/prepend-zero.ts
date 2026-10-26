import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[prependZero]'
})
export class PrependZeroDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    
    if (!value || value.trim().length === 0) {
      return;
    }

    
    const newValue = this.prependZero(value);
    
    this.el.nativeElement.value = newValue;
  }

  
  prependZero(value: string): string {
    
    value = value.replace(/^0+/, '');
    
    return '0' + value;
  }
}
