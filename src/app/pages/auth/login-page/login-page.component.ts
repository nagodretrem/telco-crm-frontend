import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SingleFocusLayoutComponent } from '../../../shared/layouts/single-focus-layout/single-focus-layout.component';
import { LoginFormComponent } from '../../../features/auth/components/login-form/login-form.component';

@Component({
  selector: 'etiya-login-page',
  standalone: true,
  imports: [
    CommonModule,
    SingleFocusLayoutComponent,
    LoginFormComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent { }
