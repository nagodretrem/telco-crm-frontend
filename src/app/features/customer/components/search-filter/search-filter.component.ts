import { SearchCustomerApiService } from './../../services/search-customer-api.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataTransferService } from '../../services/data-transfer.service';

@Component({
  selector: 'etiya-search-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {

  searchForm: FormGroup = this.fb.group({
    nationalityId: [''],
    id: [''],
    accountId: [''],
    firstName: [''],
    middleName: [''],
    lastName: [''],
    orderId: [''],


  });


  constructor(
    private fb: FormBuilder,
    private searchCustomerApiService: SearchCustomerApiService,
    private dataService: DataTransferService
  ) {}

  onSearch() {
    this.searchCustomerApiService.searchCustomer(this.searchForm.value).subscribe( {
      next: (data) => {
        this.dataService.sendFilterResult(data);
      },
      error: (error) => {
        this.dataService.sendFilterResult(null);
      },
      complete: () => {
        console.log('complete');
      }

    });  }

  onClear() {
    this.searchForm.reset();
    this.dataService.sendFilterResult(undefined);
  }

  isFormEmpty() {
    for (const key in this.searchForm.value) {
      if (this.searchForm.value[key]) {
        return false;
      }
    }
    return true;
  }
 }
