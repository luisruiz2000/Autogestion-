import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public requests: HttpRequest<any>[] = [];
  public isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  loadingMap: Map<string, boolean> = new Map<string, boolean>();
  constructor() { 
    console.log("Cargando el servicio")
  }
  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }
    if (loading === true) {
      console.log("Cargando el servicio loading true")
      this.loadingMap.set(url, loading);
      this.isLoading.next(true);
    }else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.isLoading.next(false);
    }
  }
}
