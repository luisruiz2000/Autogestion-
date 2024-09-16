import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PATH_CIUDADES,
  PATH_CIUDADES_SEGMENTO, PATH_MARCAS,
  PATH_TALLERES,
  PATH_TALLERES_SEGMENTO,
  PATH_TIPO_VEHICULO
} from '../shared/constantes';
import {TallerSegmentoRequestDTO} from "../models/tallerSegmentoRequestDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TalleresService {

  // taller: Taller;

  constructor(private http: HttpClient) { }

  getCiudades():Observable<any> {
    return this.http.get(PATH_CIUDADES);
  }

  getCiudadesSegmento(tallerSegmentoRequestDTO: TallerSegmentoRequestDTO): Observable<any> {
    return this.http.post(PATH_CIUDADES_SEGMENTO, tallerSegmentoRequestDTO);
  }
  getTalleresSegmento(tallerSegmentoRequestDTO: TallerSegmentoRequestDTO): Observable<any> {
    return this.http.post(PATH_TALLERES_SEGMENTO, tallerSegmentoRequestDTO);
  }

  getMarcasCiudad(ciudadID: any): Observable<any> {
    return this.http.get(`${PATH_MARCAS}/${ciudadID}`);
  }
  getTipoVehiculo(): Observable<any> {
    return this.http.get(PATH_TIPO_VEHICULO);
  }

  getTalleres(solicitud: any) {
    return this.http.post(PATH_TALLERES, solicitud);
  }

}
