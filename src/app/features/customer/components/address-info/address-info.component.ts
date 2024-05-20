import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { CreateAddressRequest } from '../../models/requests/create-address-request';
import { selectCustomerAddresses } from '../../../../shared/store/addresses/customer-address.selector';
import { DialogModule } from 'primeng/dialog';
import { AddressAddComponent } from '../add-address/address-add.component';
import { deleteCustomerAddress } from '../../../../shared/store/addresses/customer-address.action';
import { ClickOutsideDirective } from '../../../../core/directives/click-outside.directive';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../../../../shared/components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../../../shared/components/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'etiya-address-info',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    AddressAddComponent,
    ClickOutsideDirective,
  ],
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInfoComponent implements OnInit {
  display: boolean = false;
  addresses$: Observable<CreateAddressRequest[]>;
  selectedAddress: CreateAddressRequest | null = null;
  openMenus: { [key: string]: boolean } = {};
  hasAddresses: boolean = false;

  constructor(
    private store: Store<{
      customerAddress: { customerAddresses: CreateAddressRequest[] };
    }>,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.addresses$ = this.store.select(selectCustomerAddresses);
    this.addresses$.subscribe(addresses => {
      this.hasAddresses = addresses.length > 0;
    });
  }

  onClose(event: any) {
    this.display = false;
    this.selectedAddress = null;
  }

  confirmDeleteAddress(address: CreateAddressRequest) {
    this.addresses$.pipe(take(1)).subscribe(addresses => {
      if (addresses.length <= 1) {
        this.dialog.open(AlertDialogComponent, {
          data: { message: 'This record cannot be deleted as there must be at least one registered address!' }
        });
      } else {
        const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
          data: { message: 'Are you sure you want to delete your address?' }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.deleteAddress(address);
          }
        });
      }
    });
  }

  deleteAddress(address: CreateAddressRequest) {
    this.store.dispatch(
      deleteCustomerAddress({ addressId: address.addressId })
    );
    this.closeMenu(address);
  }

  editAddress(address: CreateAddressRequest) {
    this.selectedAddress = address;
    this.display = true;
    this.closeMenu(address);
  }

  addNewAddress() {
    this.selectedAddress = null;
    this.display = true;
  }

  toggleMenu(address: CreateAddressRequest) {
    this.openMenus[address.addressId] = !this.openMenus[address.addressId];
  }

  isMenuOpen(address: CreateAddressRequest): boolean {
    return this.openMenus[address.addressId];
  }

  closeMenu(address: CreateAddressRequest) {
    this.openMenus[address.addressId] = false;
  }

  closeAllMenus() {
    this.openMenus = {};
  }

  previousButton() {
    this.router.navigate(['/create/demographic-info']);
  }

  nextButton() {
    this.router.navigate(['/create/add-contact-medium']);
  }
}
