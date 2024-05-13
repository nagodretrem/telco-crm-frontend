import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchCustomerResponse } from '../models/responses/search-customer-response';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private filterResult = new Subject<SearchCustomerResponse>();
  private pageAndSize = new Subject<any>();

  constructor() { }

  sendFilterResult(data:any){
    this.filterResult.next(data);
  }

  getFilterResult(){
    return this.filterResult.asObservable();
  }

  sendPageAndSize(data:any){
    this.pageAndSize.next(data);
  }

  getPageAndSize(){
    return this.pageAndSize.asObservable();
  }
}
