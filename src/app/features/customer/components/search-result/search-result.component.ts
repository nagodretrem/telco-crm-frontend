import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataTransferService } from '../../services/data-transfer.service';
import { SearchCustomerResponse } from '../../models/responses/search-customer-response';
import { Router } from '@angular/router';


@Component({
  selector: 'etiya-search-result',
  standalone: true,
  imports: [
    CommonModule,
    TableModule

  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SearchResultComponent implements OnInit {


  customers: SearchCustomerResponse | null | undefined;



  constructor(
    private dataService: DataTransferService,
    private change: ChangeDetectorRef,
    private router: Router
  ){

  }

  ngOnInit() {
    this.dataService.getFilterResult().subscribe(data => {
      this.customers=data;
      this.change.markForCheck();
    })
  }


  navigateToCreateCustomer() {
    this.router.navigate(['/create/demographic-info']);
    }





































 }
