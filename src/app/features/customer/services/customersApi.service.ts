import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersApiService {

  constructor(private http:HttpClient) { }


  getListAll(): Observable<Object[]>{ 
     return this.http.get<Object[]>('http://localhost:8081/customerservice/api/v1/individualCustomers')
    // .subscribe((httpResponse) =>{
    //   console.log(httpResponse)
    // })
  }



  getListWihtPagination(page:number,size:number){
    this.http.get(`http://localhost:8081/customerservice/api/v1/individualCustomers?page=${page}&size=${size}`)
    .subscribe((httpResponse) =>{
      console.log(httpResponse)
    })
  }

}
