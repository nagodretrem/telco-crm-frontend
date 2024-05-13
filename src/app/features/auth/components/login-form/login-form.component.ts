import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'etiya-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {

  form: FormGroup = this.fb.group({
    // Form Controls
    username:[
      '',
      [
      Validators.required
      ]

    ],
    password: [
      '', // [0] : Başlangıç değeri
      [Validators.required], // [1] : Validasyonlar
    ],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  onFormSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.router.navigate(['/search']);
    this.submit();
  }

  submit(){
    console.log("submitted form:" + this.form.value);
  }
 }
