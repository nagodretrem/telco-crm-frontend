import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/responses/cities-response';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http:HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>('http://localhost:8001/customerservice/api/v1/cities');
  }

}
