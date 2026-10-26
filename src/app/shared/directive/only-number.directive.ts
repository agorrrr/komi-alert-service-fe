import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]',
  standalone: true
})
export class OnlyNumberDirective {
  constructor() {
  }

  @HostListener('keypress', ['$event']) onkeypress(event: KeyboardEvent) {
    return !isNaN(Number(event.key));
  }
}
