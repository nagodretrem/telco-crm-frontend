import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData = new BehaviorSubject<any>({});

  currentData = this.formData.asObservable();

  constructor() { }

  updateFormData(data: any) {
    this.formData.next(data);
  }
}
