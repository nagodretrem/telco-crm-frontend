import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { setCustomerAddresses, updateCustomerAddress } from '../../../../shared/store/addresses/customer-address.action';
import { CitiesService } from '../../services/cities.service';
import { City } from '../../models/responses/cities-response';
import { CreateAddressRequest } from '../../models/requests/create-address-request';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'etiya-address-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressAddComponent implements OnInit, OnChanges, OnDestroy  {
  private unsubscribe$ = new Subject<void>();
  addresses$: Observable<CreateAddressRequest[]>;

  cities: City[] = [];
  form: FormGroup;

  @Input() address: CreateAddressRequest | null = null;
  @Output() onClose = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private store: Store<{ customerAddress: { customerAddresses: CreateAddressRequest[] } }>,
    private citiesService: CitiesService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.createForm();
    this.citiesService.getCities().subscribe((response) => {
      this.cities = response.sort((a, b) => a.name.localeCompare(b.name));
      this.change.detectChanges();
    });

    this.store.select(state => state.customerAddress.customerAddresses)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(customerAddresses => {
      console.log(customerAddresses);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['address'] && this.form) {
      if (this.address) {
        this.form.patchValue(this.address);
      } else {
        this.form.reset(); // Yeni adres eklerken formu sıfırla
      }
    }
  }

  createForm() {
    this.form = this.fb.group({
      cityId: ['', Validators.required],
      houseNumber: ['', Validators.required],
      description: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  createAddress() {
    const customerAddress: CreateAddressRequest = {
      addressId: this.address ? this.address.addressId : this.generateUniqueId(),
      customerId: this.address ? this.address.customerId : '', // customerId sonradan atanacak
      cityId: this.form.value.cityId,
      cityName: this.cities.find((city) => city.id === this.form.value.cityId)?.name,
      houseNumber: this.form.value.houseNumber,
      description: this.form.value.description,
      street: this.form.value.street,
    };

    if (this.address) {
      // Edit mode
      this.store.dispatch(updateCustomerAddress({ customerAddress }));
    } else {
      // Create mode
      this.store.dispatch(setCustomerAddresses({ customerAddresses: [customerAddress] }));
    }
    this.form.reset();
  }

  generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
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


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
