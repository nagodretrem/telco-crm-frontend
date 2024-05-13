import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCustomerRequest } from '../models/requests/create-customer-request';
import { Observable } from 'rxjs';
import { CreateCustomerResponse } from '../models/responses/create-customer-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http: HttpClient) { }

  postCustomer(customer: CreateCustomerRequest):Observable<CreateCustomerResponse> {
    return this.http.post<CreateCustomerResponse>('http://localhost:8001/customerservice/api/v1/individualCustomers', customer);
  }

}
