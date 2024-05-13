import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[OnlyLetter]',
  standalone: true,
})
export class OnlyLetterDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z ]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
 }
