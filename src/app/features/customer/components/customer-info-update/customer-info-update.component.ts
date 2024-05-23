import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyNumberDirective } from '../../../../core/directives/only-number.directive';
import { OnlyLetterDirective } from '../../../../core/directives/only-letter.directive';
import { CustomerApiService } from '../../services/customer-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ageValidator } from '../demographic-info/demographic-info.component';

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
  maxDate: string;

  customerId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerApiService: CustomerApiService,
    private route: ActivatedRoute,
    private change: ChangeDetectorRef

  ) {
  }

  ngOnInit() {
    this.createForm();
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.customerId = params.get('id')!;
        return this.customerApiService.getCustomer(this.customerId);
      })
    ).subscribe((customerData) => {
      this.fillFormWithCustomerData(customerData);
    });

    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // months are 0-based in JS
    const day = ('0' + date.getDate()).slice(-2);

    this.maxDate = `${year - 18}-${month}-${day}`;
  }

  fillFormWithCustomerData(customerData: any) {
    this.form.patchValue({
      ...customerData
    });
    this.change.detectChanges();
  }

  cancelButtonClicked() {
    this.router.navigate(['/customer-info', this.customerId]);

  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      motherName: [''],
      fatherName: [''],
      birthDate: ['', [Validators.required, ageValidator(18)]],
      nationalityId: ['', [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
      ]],
    });
  }

  createCustomer() {
    const individualCustomer: any = {
      id: this.customerId,
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



     this.customerApiService.updateCustomer(individualCustomer).subscribe({
      next: data => {
        console.log('Success!', data);
        this.router.navigate(['/customer-info', this.customerId]);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });




  }

  onFormSubmit() {

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.createCustomer();
  }
}
