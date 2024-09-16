import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PATH_ELIMINAR_VEHICULO, PATH_REGISTRAR_PLACA, PATH_RIESGOS_ASOCIADOS, PATH_HOGAR_VINCULADAS, PATH_HOGAR_VINCULAR_DOCUMENTO, PATH_HOGAR_ELIMINAR} from '../shared/constantes';
import { PolizaAutoDTO } from '../models/polizaAutoDTO';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {

  constructor(private http: HttpClient) { }

  eliminarVehiculo(vehiculoDTO: PolizaAutoDTO): Observable<any> {
    return this.http.post(PATH_ELIMINAR_VEHICULO, vehiculoDTO);
  }

  registrarPlaca(vehiculoDTO: PolizaAutoDTO): Observable<any> {
    return this.http.post(PATH_REGISTRAR_PLACA, vehiculoDTO);
  }

  asociarRiesgos(solicitud: any): Observable<any>{
    return this.http.post(PATH_RIESGOS_ASOCIADOS, solicitud);
  }
  hogarVinculadas(username: any): Observable<any>{
    return this.http.post(PATH_HOGAR_VINCULADAS, {"username": username});
  }
  hogarVincular(solicitud: any): Observable<any>{
    return this.http.post(PATH_HOGAR_VINCULAR_DOCUMENTO, solicitud);
  }
  hogarEliminar(solicitud: any): Observable<any>{
    return this.http.post(PATH_HOGAR_ELIMINAR, solicitud);
  }
  orderbyDateMajorHogar(respuesta : any){
    let data = respuesta['data']['polizasHogar'];
    console.log("Hogares=>", data);
    let dataOrder =  data.sort((a: { fechaVigenciaHasta: any; },b: { fechaVigenciaHasta: any; })=> {return new Date(b.fechaVigenciaHasta).getTime() - new Date(a.fechaVigenciaHasta).getTime()});
    return dataOrder;
  }  
}
