import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {
  PATH_NOTIFICACIONES_ACTUALIZAR,
  PATH_NOTIFICACIONES_CANTIDAD, PATH_NOTIFICACIONES_CREAR,
  PATH_NOTIFICACIONES_LISTA
} from "../shared/constantes";

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  countNotificacionSource: Subject<any> = new Subject();
  showNotificacionSource: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  getObservable(): Observable<any> {
    return this.countNotificacionSource.asObservable();
  }

  getShowObservable(): Observable<any> {
    return this.showNotificacionSource.asObservable();
  }

  countNotifications(solicitud: Object): Observable<any> {
    return this.http.post(PATH_NOTIFICACIONES_CANTIDAD, solicitud);
  }

  listNotifications(solicitud: Object): Observable<any> {
    return this.http.post(PATH_NOTIFICACIONES_LISTA, solicitud);
  }
  updateNotificaciones(solicitud: Object):Observable<any>{
    return this.http.post(PATH_NOTIFICACIONES_ACTUALIZAR, solicitud)
  }
  createNotification(solicitud: Object):Observable<any>{
    return this.http.post(PATH_NOTIFICACIONES_CREAR, solicitud)
  }
}
