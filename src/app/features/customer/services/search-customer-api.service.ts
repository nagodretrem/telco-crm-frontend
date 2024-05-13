import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchCustomerResponse } from '../models/responses/search-customer-response';

@Injectable({
  providedIn: 'root'
})
export class SearchCustomerApiService {

  private url = 'http://localhost:8001/searchservice/api/v1/searchCustomers/params';

  constructor(
    private http: HttpClient,
  ) { }

  searchCustomer(request: any) {
    let params = new HttpParams();
    for (let key in request) {
      if (request[key]) {
        params = params.append(key, request[key]);
      }
    }
    return this.http.get<SearchCustomerResponse>(this.url, { params });
  }


}
