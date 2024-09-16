import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  PATH_RADICAR_SINIESTRO,
  PATH_GET_VEHICULOS,
  PATH_SINIESTRO_DATOS_BASICOS, PATH_SINIESTRO_CARGAR_EVIDENCIA, PATH_OBTENER_SINIESTROS
} from '../shared/constantes';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import {SiniestroCreateDTO} from "../models/siniestroCreateDTO";
import {EvidenciaSiniestroDTO} from "../models/evidenciaSiniestroDTO";
import { RespuestaDto } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RadicarSiniestroService {

  usuario!: Usuario;

  constructor(
    private http: HttpClient
    ) { }

  getVehiculos(usuario: any) {
    let headers_object = new HttpHeaders();
    headers_object =   headers_object.append('Access-Control-Request-Method', 'POST')
                                     .append('origin', 'http://autogestion-web.adacsc.co');
    const httpOptions = {
    headers: headers_object
};
    return this.http.post<any>(PATH_GET_VEHICULOS, usuario);
  }

  radicarSiniestro(datosSiniestro: any) {
    return this.http.post<any>(PATH_RADICAR_SINIESTRO, datosSiniestro);
  }
  registroDatosBasicos(datosBasicos: SiniestroCreateDTO){
    return this.http.post<any>(PATH_SINIESTRO_DATOS_BASICOS, datosBasicos);
  }
  cargarEvidencia(evidencia: EvidenciaSiniestroDTO){
    return this.http.post<any>(PATH_SINIESTRO_CARGAR_EVIDENCIA, evidencia);
  }
  obtenerSiniestros(solicitud: any): Observable<any>{
    return this.http.post<any>(PATH_OBTENER_SINIESTROS, solicitud);
  }

  /**
   * @author Yajaira Sanabria
   * @fecha 30/10/2020
   * @desc Retorna el listado de vehiculos agrupados por placa y con su respectivo historial de pólizas
   * @return void
   */
  getVehiculosAgrupados(respuesta: any){
   let dataOrder = this.orderbyDateMajor(respuesta);
    let autos: any =[];
      if (respuesta.success == true) {
        //let data = respuesta['data']['polizasAutos'];
        let data = dataOrder;
        let polizasAgrupadas: any =[];
        let temPlaca = "";
        let lastItem =0;
        data.forEach ((poliza: any) => {
          if (poliza.placa === temPlaca) {
            polizasAgrupadas[lastItem].polizasAnteriores.push(poliza);
          }else {
            temPlaca = poliza.placa;
            poliza.polizasAnteriores =[];
            polizasAgrupadas.push(poliza);
            lastItem = polizasAgrupadas.length - 1;
            console.log("Polizas->" + poliza.placa );
          }
        });
         respuesta['data']['polizasAutos'] =  polizasAgrupadas.sort((a: { fechaVigenciaHasta: any; },b: { fechaVigenciaHasta: any; })=> {return new Date(b.fechaVigenciaHasta).getTime() - new Date(a.fechaVigenciaHasta).getTime()});
        autos= respuesta;
      }
    return autos;
  }
  orderbyDateMajor(respuesta : any){
    let data = respuesta['data']['polizasAutos'];
    let polizasAuto = [];
    let dataOrder =  data.sort((a: { fechaVigenciaHasta: any; },b: { fechaVigenciaHasta: any; })=> {return new Date(b.fechaVigenciaHasta).getTime() - new Date(a.fechaVigenciaHasta).getTime()});
    let dataOrder2 =  dataOrder.sort((a: { placa: string; },b: { placa: string; })=> 
      {
        if (a.placa < b.placa ) return -1;
        else if(a.placa > b.placa ) return 1;
        else return 0;
              
    });
    console.log("First Elent->"+ JSON.stringify(data.at(0)));
   // console.log("Polizas->" + JSON.stringify(dataOrder2 ));
    return dataOrder2;
  }
  
}
