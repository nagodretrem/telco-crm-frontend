import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  showPassword: boolean = false;
  users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];
  errorMessage: string;

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }

    const username = this.form.get('username').value;
    const password = this.form.get('password').value;

    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      if (this.authService.login(user.username, user.password)) {
        this.router.navigate(['/search']);
        this.submit();
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  submit() {
    console.log("submitted form:", this.form.value);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
