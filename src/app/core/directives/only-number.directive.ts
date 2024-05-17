import { Directive, ElementRef, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[OnlyNumber]',
  standalone: true,
})
export class OnlyNumberDirective {
  constructor(private _el: ElementRef, @Self() private ngControl: NgControl) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
    this.ngControl.control.setValue(this._el.nativeElement.value);
  }
 }
