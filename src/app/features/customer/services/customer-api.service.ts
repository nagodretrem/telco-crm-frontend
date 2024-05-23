import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCustomerRequest } from '../models/requests/create-customer-request';
import { CreateCustomerResponse } from '../models/responses/create-customer-response';
import { CreateContactMediumRequest } from '../models/requests/create-contact-medium-request';
import { CreateAddressRequest } from '../models/requests/create-address-request';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  private baseUrl = 'http://localhost:8001/customerservice/api/v1';

  constructor(private http: HttpClient) { }

  postCustomer(customer: CreateCustomerRequest): Observable<CreateCustomerResponse> {
    const url = `${this.baseUrl}/individualCustomers`;
    return this.http.post<CreateCustomerResponse>(url, customer);
  }

  getCustomer(customerId: string): Observable<CreateCustomerResponse> {
    const url = `${this.baseUrl}/individualCustomers/${customerId}`;
    return this.http.get<CreateCustomerResponse>(url);
  }

  updateCustomer(customer: CreateCustomerRequest): Observable<CreateCustomerResponse> {
    const url = `${this.baseUrl}/individualCustomers`;
    return this.http.put<CreateCustomerResponse>(url, customer);
  }

  deleteCustomer(customerId: string): Observable<any> {
    const url = `${this.baseUrl}/individualCustomers/${customerId}`;
    return this.http.delete<any>(url);
  }

  checkNationalityIdExists(nationalityId: string): Observable<boolean> {
    const url = `${this.baseUrl}/individualCustomers/checkNationalityId/${nationalityId}`;
    return this.http.get<boolean>(url);
  }

  checkRealPerson(details: { firstName: string, middleName?: string, lastName: string, nationalityId: string, birthYear: string }): Observable<boolean> {
    const url = `${this.baseUrl}/individualCustomers/checkRealPerson`;
    return this.http.post<boolean>(url, details);
  }

  postContactMedium(contactMedium: CreateContactMediumRequest): Observable<any> {
    const url = `${this.baseUrl}/contactMediums`;
    return this.http.post<any>(url, contactMedium);
  }

  getContactMediumsByCustomerId(customerId: string): Observable<any> {
    const url = `${this.baseUrl}/contactMediums/getByCustomerId/${customerId}`;
    return this.http.get<any>(url);
  }

  updateContactMedium(contactMedium: CreateContactMediumRequest): Observable<any> {
    const url = `${this.baseUrl}/contactMediums`;
    return this.http.put<any>(url, contactMedium);
  }

  postAddress(address: CreateAddressRequest): Observable<any> {
    const url = `${this.baseUrl}/addresses`;
    return this.http.post<any>(url, address);
  }

  getAddressesByCustomerId(customerId: string): Observable<any> {
    const url = `${this.baseUrl}/addresses/getListWithCustomerId/${customerId}`;
    return this.http.get<any>(url);
  }

  updateAddress(address: CreateAddressRequest): Observable<any> {
    const url = `${this.baseUrl}/addresses`;
    return this.http.put<any>(url, address);
  }

  deleteAddress(addressId: string): Observable<any> {
    const url = `${this.baseUrl}/addresses/${addressId}`;
    return this.http.delete<any>(url);
  }
}
