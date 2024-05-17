import { CustomerApiService } from './../../services/customer-api.service';
import { selectIndividualCustomer } from '../../../../shared/store/customers/indivudual-customer.selector';
import { CreateCustomerRequest } from '../../models/requests/create-customer-request';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { setIndividualCustomer } from '../../../../shared/store/customers/indivudual-customer.action';
import { Store, select } from '@ngrx/store';
import { OnlyNumberDirective } from '../../../../core/directives/only-number.directive';
import { OnlyLetterDirective } from '../../../../core/directives/only-letter.directive';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'etiya-demographic-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnlyNumberDirective,
    OnlyLetterDirective
  ],
  templateUrl: './demographic-info.component.html',
  styleUrl: './demographic-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemographicInfoComponent implements OnInit {

  maxDate: string;
  form: FormGroup;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{individualCustomer: CreateCustomerRequest}>,
    private customerApiService: CustomerApiService

  ) {
  }

  ngOnInit() {

    this.createForm();
    this.store
    .pipe(select(selectIndividualCustomer))
    .subscribe((individualCustomer) => {
      if (individualCustomer) {
        this.form.patchValue(individualCustomer);
      }
    });

    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // months are 0-based in JS
    const day = ('0' + date.getDate()).slice(-2);

    this.maxDate = `${year - 18}-${month}-${day}`;



  }


  cancelButtonClicked() {
   const individualCustomer: CreateCustomerRequest = {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      motherName: "",
      fatherName: "",
      birthDate: null,
      nationalityId: "",
    };
    this.store.dispatch(setIndividualCustomer({ individualCustomer }));
    this.router.navigate(['/search']);

  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      motherName: ['',],
      fatherName: ['',],
      birthDate: ['', [Validators.required, ageValidator(18)]],
      nationalityId: ['', [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
      ]],
    });
  }

  createCustomer() {
    const individualCustomer: CreateCustomerRequest = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      gender: this.form.value.gender,
      motherName: this.form.value.motherName,
      fatherName: this.form.value.fatherName,
      birthDate: this.form.value.birthDate,
      nationalityId: this.form.value.nationalityId,
    };

    console.log(individualCustomer);



     this.customerApiService.postCustomer(individualCustomer).subscribe({
      next: data => {
        console.log('Success!', data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });



    this.store.dispatch(setIndividualCustomer({ individualCustomer }));
    this.router.navigate(['/create/address-info']);
  }

  onFormSubmit() {

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.createCustomer();
  }




 }

 export function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const controlDate = new Date(control.value);
    const today = new Date();

    let age = today.getFullYear() - controlDate.getFullYear();

    if (controlDate.getMonth() > today.getMonth() ||
        (controlDate.getMonth() === today.getMonth() && controlDate.getDate() > today.getDate())) {
      age--;
    }

    if (age < minAge) {
      return { ageInvalid: true };
    }

    return null;
  };
}
