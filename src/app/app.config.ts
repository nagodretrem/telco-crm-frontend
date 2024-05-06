import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { RippleModule } from 'primeng/ripple';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
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
