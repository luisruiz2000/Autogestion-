import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { SpinnerService } from './shared/interceptors/spinner/spinner.service';
import { ModalService } from './services/modal.service';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
let requests: HttpRequest<any>[] = [];
export const exampleInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let modalService: ModalService = inject(ModalService)
  let spinnerService: SpinnerService = inject(SpinnerService);
  requests.push(req);
  spinnerService.isLoading.next(true);
  
 return new Observable(observer => {
    const subscription = next(req)
      .subscribe(
        (event: any) => {
          if (event instanceof HttpResponse) {
            const i = requests.indexOf(req);
          if (i >= 0) {
            requests.splice(i, 1);
          }
          spinnerService.isLoading.next(requests.length > 0);
          console.log("Hola " + requests.length);
          observer.next(event);
          }
        },
        (err: any) => {
       
          requests = [];
          spinnerService.isLoading.next(requests.length > 0);
          observer.error(err);
          
        },
        () => {
          const i = requests.indexOf(req);
          if (i >= 0) {
            requests.splice(i, 1);
          }
          spinnerService.isLoading.next(requests.length > 0);
          observer.complete();
        });
    // remove request from queue when cancelled
    return () => {
      
      subscription.unsubscribe();
    };
  });
};
