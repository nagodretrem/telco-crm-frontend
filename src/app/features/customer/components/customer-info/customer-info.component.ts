import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CustomerApiService } from '../../services/customer-api.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateCustomerResponse } from '../../models/responses/create-customer-response';
import { ButtonModule } from 'primeng/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoComponent implements OnInit {
  customer$!: Observable<CreateCustomerResponse>;
  customerId: string;

  constructor(
    private route: ActivatedRoute,
    private customerApiService: CustomerApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.customer$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.customerId = params.get('id')!;
        return this.customerApiService.getCustomer(this.customerId);
      })
    );
  }

  editCustomer() {
    this.router.navigate(['/customer-info-update', this.customerId]);
  }
  deleteCustomer() {
    this.customerApiService.deleteCustomer(this.customerId).subscribe({
      next: () => {
        console.log('Customer deleted successfully');
        this.snackBar.open('Customer deleted successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        this.router.navigate(['/search']);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
