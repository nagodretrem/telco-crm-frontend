import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoComponent { }
