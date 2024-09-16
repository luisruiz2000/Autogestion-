import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ID_DOMINIO_TIPO_DOCUMENTO,
  PATH_DOMINIOS,
  PATH_TOOLTIPS_NOAUTH,
  CAPTCHA_SITE_KEY_PREVISORA,
  PATH_CONSULTAR_CHAT,
  TIPO_DOMINIO_TIPOS_DOC
} from '../shared/constantes';
import {Dominio} from "../models/dominio";
import {NotificacionesService} from "./notificaciones.service";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient, private notificacionesService: NotificacionesService) { }

  getRecaptchaSiteKey(): Observable<any> {
    return of(CAPTCHA_SITE_KEY_PREVISORA);
  }

  getLinkChat():Observable<any>{
    return this.http.get(PATH_CONSULTAR_CHAT);
  }

  guardarDatosPorPlaca(placa: string, radicado: string) {
    let objetoLocal: any = localStorage.getItem(placa);
    if (objetoLocal) {
      objetoLocal = JSON.parse(objetoLocal);
      let existeRegistro = objetoLocal.filter((data: string) => data === radicado);
      if (!existeRegistro || existeRegistro.length == 0) {
        objetoLocal.push(radicado);
        localStorage.setItem(placa, objetoLocal);
      }
    }else{
      let radicados = [];
      radicados.push(radicado);
      localStorage.setItem(placa, JSON.stringify(radicados));
    }
  }
  borrarDatosPorPlaca(placa: string){
    let objetoLocal: any = localStorage.getItem(placa);
    if (objetoLocal) {
      objetoLocal = JSON.parse(objetoLocal);
      if(objetoLocal.length > 0){
        objetoLocal.forEach((radicado: string) =>{
          localStorage.removeItem(radicado);
        });
      }
    }
    localStorage.removeItem(placa);
  }

  getTiposDocumentos(): Observable<any> {
    const parametro = {
      tipoDominio: ID_DOMINIO_TIPO_DOCUMENTO
    };
    let dominio = new Dominio();
    dominio.tipoDominio = TIPO_DOMINIO_TIPOS_DOC;
    return this.http.post(PATH_DOMINIOS, dominio);
  }

  getTooltipSinAutenticacion(): Observable<any> {
    return this.http.get(PATH_TOOLTIPS_NOAUTH);
  }

  getCountNotifications(solicitudNotificaciones: any):void{
    console.log("Solicitud Notificacionesd=>",solicitudNotificaciones)
    this.notificacionesService.countNotifications(solicitudNotificaciones).subscribe(
      respuesta =>{
        if(respuesta && respuesta.data){
          let cantidadNotificaciones = respuesta.data.cantidadNotificaciones;
          this.notificacionesService.countNotificacionSource.next(cantidadNotificaciones);
        }else{
          this.notificacionesService.countNotificacionSource.next(0);
        }
      }
    )
  }
}
