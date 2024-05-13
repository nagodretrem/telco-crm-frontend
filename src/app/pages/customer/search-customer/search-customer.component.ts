import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFilterComponent } from '../../../features/customer/components/search-filter/search-filter.component';
import { SearchResultComponent } from '../../../features/customer/components/search-result/search-result.component';

@Component({
  selector: 'etiya-search-customer',
  standalone: true,
  imports: [
    CommonModule,
    SearchFilterComponent,
    SearchResultComponent
  ],
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCustomerComponent { }
