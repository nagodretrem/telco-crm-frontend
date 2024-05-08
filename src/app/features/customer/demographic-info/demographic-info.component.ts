import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormDataService } from '../services/formData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'etiya-demographic-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './demographic-info.component.html',
  styleUrl: './demographic-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemographicInfoComponent {

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  form: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    gender: [''],
    motherName: [''],
    middleName: [''],
    birthDate: [''],
    fatherName: [''],
    nationalityId: [''],


  });


  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private router: Router

  ) {
    this.formDataService.currentData.subscribe(data => {
      if (data) {
        this.form.patchValue(data);
      }
    });
  }


  onSubmitForm() {
    this.formDataService.updateFormData(this.form.value);
    this.formSubmit.emit(this.form.value);
    }

  cancelButtonClicked() {
    this.router.navigate(['/search']);
  }
 }
