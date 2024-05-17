import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
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
  showPassword: boolean = false;
  users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];
  errorMessage: string;

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
      [Validators.required, Validators.minLength(6)], // [1] : Validasyonlar
    ],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onFormSubmit(username: string, password: string) {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }

    const user = this.users.find(u => u.username === username && u.password === password);
    if (this.authService.login(user.username, user.password)) {
      
      this.router.navigate(['/search']);
      this.submit();
    } else {
      this.errorMessage = 'Invalid username or password';
    }
    
  

  }

  submit(){
    console.log("submitted form:" + this.form.value);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
 }
