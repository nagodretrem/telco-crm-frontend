import { selectCustomerAddress } from './../../../../shared/store/addresses/customer-address.selector';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CreateAddressRequest } from '../../models/requests/create-address-request';
import { Store } from '@ngrx/store';
import { setCustomerAddress, setCustomerAddresses } from '../../../../shared/store/addresses/customer-address.action';

@Component({
  selector: 'etiya-address-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule
  ],
  templateUrl: './address-add.component.html',
  styleUrl: './address-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressAddComponent implements OnInit{

  @Output() onClose = new EventEmitter();
  createdAdresses: CreateAddressRequest[] = [];
  form: FormGroup;

  constructor(
    private fb:FormBuilder,
    private store: Store<{customerAddresses : CreateAddressRequest}>
  ){}

  ngOnInit() {
    this.createForm();




  }
  createForm() {
  this.form = this.fb.group({
    cityId: ['', Validators.required],
    houseFlatNumber:['', Validators.required],
    addressDescription: ['', Validators.required],
    street: ['', Validators.required],
  });
}

createAddress() {
  const customerAddress : CreateAddressRequest = {
    customerId: "",
    cityId: this.form.value.cityId,
    houseFlatNumber: this.form.value.houseFlatNumber,
    addressDescription: this.form.value.addressDescription,
    street: this.form.value.street
  };
  this.createdAdresses = [...this.createdAdresses, customerAddress]; // Replace the array with a new one
  this.store.dispatch(setCustomerAddress({customerAddress}))
  this.store.dispatch(setCustomerAddresses({customerAddresses: this.createdAdresses}));

  this.form.reset();

  console.log(this.createdAdresses)
  this.store.select(selectCustomerAddress).subscribe(value => {
    console.log(value); // Log the value from the Observable
  });
}

  onFormSubmit() {

      if (this.form.invalid) {
        console.error('Form is invalid');
        return;
      }

      this.createAddress();

      this.onClose.emit();
    }

    close() {
      this.onClose.emit();
    }
 }

