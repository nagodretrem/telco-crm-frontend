import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SearchCustomerComponent } from './pages/customer/search-customer/search-customer.component';
import { CreateCustomerComponent } from './pages/customer/create-customer/create-customer.component';
import { DemographicInfoComponent } from './features/customer/components/demographic-info/demographic-info.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AddressInfoComponent } from './features/customer/components/address-info/address-info.component';
import { AddressAddComponent } from './features/customer/components/add-address/address-add.component';
import { TopMenuComponent } from './shared/layouts/top-menu/top-menu.component';
import { CustomerInfoComponent } from './features/customer/components/customer-info/customer-info.component';
import { CustomerInfoUpdateComponent } from './features/customer/components/customer-info-update/customer-info-update.component';
import { ContactMediumComponent } from './features/customer/components/contact-medium/contact-medium.component';


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
    path: 'customer/id',
    component: MainLayoutComponent,
    children:[{
      path:'',
      pathMatch: 'full',
      component: TopMenuComponent,
      children:[
        {
          path:'',
          pathMatch: 'full',
          component: CustomerInfoComponent,
        }
      ]
    }],    
  },
  {
    path: 'customer/update',
    component: MainLayoutComponent,
    children:[{
      path:'',
      pathMatch: 'full',
      component: TopMenuComponent,
      children:[
        {
          path:'',
          pathMatch: 'full',
          component: CustomerInfoUpdateComponent,
        }
      ]
    },]
  },
  {
    path: 'create/add-contact-medium',
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
          component: ContactMediumComponent,
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
    path: 'top-menu',
    component: TopMenuComponent,
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
