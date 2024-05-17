import { Directive, ElementRef, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[OnlyLetter]',
  standalone: true,
})
export class OnlyLetterDirective {
  constructor(private _el: ElementRef, @Self() private ngControl: NgControl) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initialValue.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ ]*/g, '');
    if ( initialValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
    this.ngControl.control.setValue(this._el.nativeElement.value); // Update the form control value
  }
}
