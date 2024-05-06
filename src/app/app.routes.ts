import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SearchCustomerComponent } from './pages/customer/search-customer/search-customer.component';

export const routes: Routes = [

   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search',


   },
   {
    path: 'search',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SearchCustomerComponent,
      },
    ],
   },
  {
    path: 'login',
    component: LoginPageComponent,
  }

];
