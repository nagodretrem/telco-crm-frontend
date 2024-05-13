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
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      motherName: ['', Validators.required],
      fatherName: ['', Validators.required],
      birthDate: ['', Validators.required],
      nationalityId: ['', Validators.required],
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
    this.customerApiService.postCustomer(individualCustomer).subscribe({
      next: data => {
        console.log('Success!', data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });


    this.store.dispatch(setIndividualCustomer({ individualCustomer }));
    //this.router.navigate(['/create/address-info']);
  }

  onFormSubmit() {

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.createCustomer();
  }




 }
