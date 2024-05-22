import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { DataTransferService } from '../../services/data-transfer.service';
import { SearchCustomerResponse } from '../../models/responses/search-customer-response';
import { Router, RouterModule } from '@angular/router';
import { SearchCustomerApiService } from '../../services/search-customer-api.service';
import { PaginatorModule } from 'primeng/paginator';


@Component({
  selector: 'etiya-search-result',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    RouterModule,
    PaginatorModule
  ],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SearchResultComponent implements OnInit {
  customers: SearchCustomerResponse | null | undefined;

  page = 0;
  size = 10;
  filters: any = {};

  constructor(
    private dataService: DataTransferService,
    private searchCustomerApiService: SearchCustomerApiService,
    private change: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getFilterResult().subscribe(data => {
      this.customers = data;
      this.change.markForCheck();
      this.dataService.getParams().subscribe(params => {
        this.filters = params;
      });

    });
  }

  loadCustomers($event: TableLazyLoadEvent) {
    this.page = $event.first / this.size;
    const params = { ...this.filters, page: this.page, size: this.size };
    this.searchCustomerApiService.searchCustomer(params).subscribe(data => {
      this.customers = data;
      this.change.markForCheck();
    });
  }


  navigateToCreateCustomer() {
    this.router.navigate(['/create/demographic-info']);
  }
}
