import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OnlyLetterDirective } from '../../../../core/directives/only-letter.directive';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberDirective } from '../../../../core/directives/only-number.directive';

@Component({
  selector: 'app-contact-medium',
  standalone: true,
  imports: [
    CommonModule,
    OnlyLetterDirective,
    ReactiveFormsModule,
    OnlyNumberDirective
  ],
  templateUrl: './contact-medium.component.html',
  styleUrl: './contact-medium.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumComponent { 
  form: FormGroup;

  onFormSubmit() {

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
  
  }
}
