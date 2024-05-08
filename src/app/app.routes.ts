import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SearchCustomerComponent } from './pages/customer/search-customer/search-customer.component';
import { CreateCustomerComponent } from './pages/customer/create-customer/create-customer.component';
import { DemographicInfoComponent } from './features/customer/demographic-info/demographic-info.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AddressInfoComponent } from './features/customer/address-info/address-info.component';
import { AddressAddComponent } from './features/customer/add-address/address-add.component';


export const routes: Routes = [

   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
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
    path: 'create/demographic-info',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CreateCustomerComponent,
        children:[
          {
          path: '',
          pathMatch: 'full',
          component: DemographicInfoComponent,
        }
      ]
      },
    ],
  },
  {
    path: 'create/address-info',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CreateCustomerComponent,
        children:[
          {
          path: '',
          pathMatch: 'full',
          component: AddressInfoComponent,
          },
      ]
      },
    ],
  },
  {
    path: 'create/add-address',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CreateCustomerComponent,
        children:[
          {
          path: '',
          pathMatch: 'full',
          component: AddressAddComponent,
          },
      ]
      },
    ],
  },

  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent,
  },


];
