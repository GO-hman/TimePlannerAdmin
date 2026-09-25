import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDefaultClient } from '../api/providers';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

registerLocaleData(localeSv);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideDefaultClient({ basePath: 'http://localhost:8080' }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'sv-SE' },
    { provide: LOCALE_ID, useValue: 'sv-SE' },
  ],
};
