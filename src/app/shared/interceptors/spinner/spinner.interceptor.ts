import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { ModalService } from '../../../services/modal.service';

//import {ToastrService} from "ngx-toastr";
import {PATH_METODO_OBTENER_IMAGENES, PATH_METODO_VALIDAR_ESTADOS} from "../../constantes";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(
    private modalService: ModalService,
    private spinnerService: SpinnerService,
   // private toast: ToastrService
  ) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    console.log("Request activo");
    this.spinnerService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Spinner Interceptor"); 
    if(!this.validarMetodosAsincronos(req.url)){
      this.requests.push(req);
      this.spinnerService.isLoading.next(true);
    }
    console.log("Spinner Interceptor"); 
    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(req);
            this.requests = [];
            this.spinnerService.isLoading.next(this.requests.length > 0);
            observer.error(err);
            this.mostrarDialogo();
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }

  mostrarDialogo(){
    let msj = 'En este momento no podemos atender tu solicitud. Por favor intenta más tarde.';
   /* const toastDialog = this.toast.warning(msj, '¡Oops! Ocurrió un error',{
      closeButton: true,
      titleClass: 'toast-tittle-warning',
      messageClass: 'toast-message-success',
    });
    return toastDialog;*/
  }

  private validarMetodosAsincronos(url:string): boolean{
    if(url.includes(PATH_METODO_VALIDAR_ESTADOS)){
      return true;
    }
    else if(url.includes(PATH_METODO_OBTENER_IMAGENES)){
      return true;
    }
    else return false;
  }
}
/*return new Observable(observer => {
    const subscription = next(req)
      .subscribe(
        (event: any) => {
          if (event instanceof HttpResponse) {
           
            observer.next(event);
          }
        },
        (err: any) => {
       
          spinnerService.isLoading.next(false);
          observer.error(err);
          
        },
        () => {
          spinnerService.isLoading.next(false);
          observer.complete();
        });
    // remove request from queue when cancelled
    return () => {
      
      subscription.unsubscribe();
    };
  });*/