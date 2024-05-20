import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CustomerApiService } from '../../services/customer-api.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateCustomerResponse } from '../../models/responses/create-customer-response';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoComponent implements OnInit {
  customer$!: Observable<CreateCustomerResponse>;

  constructor(
    private route: ActivatedRoute,
    private customerApiService: CustomerApiService
  ) {}

  ngOnInit() {
    this.customer$ = this.route.paramMap.pipe(
      switchMap(params => {
        const customerId = params.get('id')!;
        return this.customerApiService.getCustomer(customerId);
      })
    );
  }
}
