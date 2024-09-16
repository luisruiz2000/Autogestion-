import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PATH_REPARACION_OBTENER_IMAGENES,
  PATH_REPARACION_VALIDAR_ESTADOS
} from '../shared/constantes';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class SeguimientoReparacionService {

  usuario!: Usuario;

  constructor(
    private http: HttpClient
    ) { }

  validarEstados(solicitud: any): Observable<any>{
    return this.http.post<any>(PATH_REPARACION_VALIDAR_ESTADOS, solicitud);
  }

  getImage(solicitud: any): Observable<any>{
    return this.http.post<any>(PATH_REPARACION_OBTENER_IMAGENES, solicitud);
  }

}
