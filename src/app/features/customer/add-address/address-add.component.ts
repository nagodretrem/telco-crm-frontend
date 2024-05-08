import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'etiya-address-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './address-add.component.html',
  styleUrl: './address-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressAddComponent {

  constructor(private fb:FormBuilder){}

  form:FormGroup = this.fb.group({
    city: new FormControl(""),
    houseFlatNumber: new FormControl(''),
    addressDescription: new FormControl(''),   
    firstName: new FormControl(''),
    secondName: new FormControl(''),
    lastName: new FormControl(''),
    orderNumber: new FormControl(''),
    })
  
 }

