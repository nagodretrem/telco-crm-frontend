import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { RippleModule } from 'primeng/ripple';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { individualCustomerReducer } from './shared/store/customers/indivudual-customer.reducer';
import { contactMediumReducer } from './shared/store/contact-medium/contact-medium.reducer';
import { errorInterceptor } from "./core/interceptors/error.interceptor";
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import { customerAddressReducer } from './shared/store/addresses/customer-address.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, authInterceptor, loadingInterceptor])),
    provideBrowserAnimations(),
    provideStore(),
    provideState({
      name: 'individualCustomer',
      reducer: individualCustomerReducer
    }),
    provideState({
      name: 'contactMedium',
      reducer: contactMediumReducer
    }),
    provideState({
      name: 'customerAddress',
      reducer: customerAddressReducer
    }), provideAnimationsAsync()
]
};


function provideBrowserAnimations( ){
  return importProvidersFrom([
    BrowserModule,
    BrowserAnimationsModule,
    RippleModule
  ])
}

