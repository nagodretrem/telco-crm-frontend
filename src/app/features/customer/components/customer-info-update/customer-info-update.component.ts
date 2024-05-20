import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyNumberDirective } from '../../../../core/directives/only-number.directive';
import { OnlyLetterDirective } from '../../../../core/directives/only-letter.directive';
import { CreateCustomerRequest } from '../../models/requests/create-customer-request';
import { CustomerApiService } from '../../services/customer-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-info-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnlyNumberDirective,
    OnlyLetterDirective
  ],
  templateUrl: './customer-info-update.component.html',
  styleUrl: './customer-info-update.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoUpdateComponent {
  form: FormGroup;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerApiService: CustomerApiService

  ) {
  }

  ngOnInit() {
    this.createForm();

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
    this.router.navigate(['/search']);

  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['',],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      motherName: ['',],
      fatherName: ['',],
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

    console.log(individualCustomer);

     /*

     this.customerApiService.postCustomer(individualCustomer).subscribe({
      next: data => {
        console.log('Success!', data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });

 */

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
