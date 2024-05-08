import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'etiya-create-customer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerComponent { }
