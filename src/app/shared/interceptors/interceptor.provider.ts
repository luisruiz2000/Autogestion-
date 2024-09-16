import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner/spinner.interceptor';
import { AuthInterceptorService } from './auth.interceptor';


export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,multi:true}
 ];
