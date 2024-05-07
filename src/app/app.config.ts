import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { RippleModule } from 'primeng/ripple';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideBrowserAnimations()
  ]
};


function provideBrowserAnimations( ){
  return importProvidersFrom([
    BrowserModule,
    BrowserAnimationsModule,
    RippleModule
  ])
}
