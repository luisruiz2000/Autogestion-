import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpXhrBackend } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SpinnerInterceptor } from './shared/interceptors/spinner/spinner.interceptor';
import { AuthInterceptorService } from './shared/interceptors/auth.interceptor';
import { exampleInterceptorInterceptor } from './example-interceptor.interceptor';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(es);
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes), provideClientHydration(), provideAnimations(), AuthService, {provide: HttpClientModule }, { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,multi:true}, provideHttpClient(withInterceptors([exampleInterceptorInterceptor])), provideNzI18n(es_ES), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
};
