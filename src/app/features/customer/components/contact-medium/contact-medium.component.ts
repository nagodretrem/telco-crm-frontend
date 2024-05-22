import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OnlyLetterDirective } from '../../../../core/directives/only-letter.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyNumberDirective } from '../../../../core/directives/only-number.directive';
import { Router } from '@angular/router';
import { CreateContactMediumRequest } from '../../models/requests/create-contact-medium-request';
import { select, Store } from '@ngrx/store';
import { CustomerApiService } from '../../services/customer-api.service';
import { selectContactMedium } from '../../../../shared/store/contact-medium/contact-medium.selector';
import { clearContactMedium, setContactMedium } from '../../../../shared/store/contact-medium/contact-medium.action';
import { selectIndividualCustomer } from '../../../../shared/store/customers/indivudual-customer.selector';
import { selectCustomerAddresses } from '../../../../shared/store/addresses/customer-address.selector';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { clearIndividualCustomer } from '../../../../shared/store/customers/indivudual-customer.action';
import { clearCustomerAddresses } from '../../../../shared/store/addresses/customer-address.action';


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
  styleUrls: ['./contact-medium.component.scss'], // Fixed property name
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<any>, // Changed type to any to handle different states
    private customerApiService: CustomerApiService,
  ) {}

  ngOnInit() {
    this.createForm();
    this.store
      .pipe(select(selectContactMedium))
      .subscribe((contactMedium) => {
        if (contactMedium) {
          this.form.patchValue(contactMedium);
        }
      });
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobilePhone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      homePhone: ['', Validators.pattern('^[0-9]*$')],
      fax: ['', Validators.pattern('^[0-9]*$')],
    });
  }

  createContactMedium() {
    const contactMedium: CreateContactMediumRequest = {
      customerId: '',
      email: this.form.value.email,
      mobilePhone: this.form.value.mobilePhone,
      homePhone: this.form.value.homePhone,
      fax: this.form.value.fax,
    };

    this.store.dispatch(setContactMedium({ contactMedium }));
    this.createCustomer();
  }

  async createCustomer() {
    try {
      const individualCustomer = await firstValueFrom(this.store.pipe(select(selectIndividualCustomer)));

      if (!individualCustomer) {
        throw new Error('No individual customer data found in the store');
      }

      const customerResponse = await firstValueFrom(this.customerApiService.postCustomer(individualCustomer));
      const customerId = customerResponse.id;

      const customerAddresses = await firstValueFrom(this.store.pipe(select(selectCustomerAddresses)));


      for (const address of customerAddresses) {
        const updatedAddress = { ...address, customerId };
        await firstValueFrom(this.customerApiService.postAddress(updatedAddress));
      }


      const contactMedium = await firstValueFrom(this.store.pipe(select(selectContactMedium)));

      if (contactMedium) {
        const updatedContactMedium = { ...contactMedium, customerId };
        await firstValueFrom(this.customerApiService.postContactMedium(updatedContactMedium));
      }

      this.store.dispatch(clearIndividualCustomer())
      this.store.dispatch(clearCustomerAddresses())
      this.store.dispatch(clearContactMedium());

      console.log('Customer, addresses, and contact medium created successfully');

      this.router.navigate([`/customer-info/${customerId}`]);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error('Backend returned validation error:', error.error);
      } else {
        console.error('Error creating customer data:', error);
      }
      this.router.navigate([`/search`]);
    }


  }



  onFormSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid', this.form.errors);
      return;
    }

    this.createContactMedium();
  }

  previousButton() {
    this.router.navigate(['/create/address-info']);
  }
}
