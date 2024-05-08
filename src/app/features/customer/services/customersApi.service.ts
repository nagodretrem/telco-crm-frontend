import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersApiService {

  constructor(private http:HttpClient) { }



  getListWihtPagination(page:number,size:number){
    return this.http.get(`http://localhost:8081/customerservice/api/v1/individualCustomers?page=${page}&size=${size}`);

  }

}
