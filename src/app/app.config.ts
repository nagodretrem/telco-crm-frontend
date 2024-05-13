import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { RippleModule } from 'primeng/ripple';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { individualCustomerReducer } from './shared/store/customers/indivudual-customer.reducer';
import { contactMediumReducer } from './shared/store/contact-medium/contact-medium.reducer';
import { individualCustomerAddressReducer } from './shared/store/addresses/customer-address.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideBrowserAnimations(),
    provideStore(),
    provideState({
      name: 'individualCustomer',
      reducer: individualCustomerReducer
    }),
    provideState({
      name: 'contanctMedium',
      reducer: contactMediumReducer
    }),
    provideState({
      name: 'address',
      reducer: individualCustomerAddressReducer
    })
]
};


function provideBrowserAnimations( ){
  return importProvidersFrom([
    BrowserModule,
    BrowserAnimationsModule,
    RippleModule
  ])
}

