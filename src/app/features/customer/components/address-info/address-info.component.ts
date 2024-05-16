import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressAddComponent } from '../add-address/address-add.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'etiya-address-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    AddressAddComponent
  ],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInfoComponent {
  display: boolean = false;

  onClose(event: any) {
    this.display = false;
  }
}
