import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    idNumber: [''],
    customerId: [''],
    accountNumber: [''],
    firstName: [''],
    secondName: [''],
    lastName: [''],
    orderNumber: [''],

  });


  constructor(
    private fb: FormBuilder
  ) {}

  onSearch() {
    console.log(this.searchForm.value);
  }

  onClear() {
    this.searchForm.reset();
  }
 }
