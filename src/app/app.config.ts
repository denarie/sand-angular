import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'de-DE'}, provideAnimationsAsync(), provideAnimationsAsync('noop')
    ],
}
