import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {catchError, filter, finalize, map, switchMap, take} from 'rxjs/operators';
import {LOCALSTORAGE_AUTHTOKEN, LOCALSTORAGE_TOKEN, ORIGEN_PETICION, URL_LOGIN} from '../constantes';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  private token = '';
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('/login') || !request.url.includes('/registrarUsuario')) {

      request = this.addAuthenticationToken(request);

      return next.handle(request).pipe(
        map(
          (response:any) => {
            if(response && response.body && response.body.status == '301'){
              throw new HttpErrorResponse({error: `${response.body.message}`, status : 301})
            }else{
              return response;
            }

          }
        ),
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401) {
            this.router.navigateByUrl(URL_LOGIN);
          }
          if (error && error.status === 301) {
            return this.controlarRefreshToken(request, next);
          }
          return throwError(error);
        }))
    } else {
      return next.handle(request);
    }
  }

  private controlarRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refrescarToken().pipe(
        switchMap((respuesta: any) => {
          this.saveTokens(respuesta.data.token, respuesta.data.refreshtoken)
          this.refreshTokenSubject.next(respuesta.data.token);
          return next.handle(this.addAuthenticationToken(request));
        }), finalize(() => this.isRefreshing = false ));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addAuthenticationToken(request));
        }));
    }
  }

  private saveTokens(token: string , refreshToken: string){
    localStorage.setItem(LOCALSTORAGE_TOKEN, refreshToken);
    localStorage.setItem(LOCALSTORAGE_AUTHTOKEN, token);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    if(request.body){
      request.body.origenPeticion = ORIGEN_PETICION;
    }

    if (request.url.includes('refreshtoken')) {
      this.token = `Previsora ${localStorage.getItem(LOCALSTORAGE_TOKEN)}`;
    } else {
      this.token = `Previsora ${localStorage.getItem(LOCALSTORAGE_AUTHTOKEN)}`;
    }
    if(!this.token){
      this.router.navigate([URL_LOGIN]);
      return request!.clone({
        setHeaders: {
          authorization: ''
        }
      });
    }
    return request!.clone({
      setHeaders: {
        authorization: this.token
      }
    });
  }

}



