import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PATH_DOMINIOS, PATH_DOMINIOS_MUNICIPIOS} from '../shared/constantes';
import {Dominio} from "../models/dominio";

@Injectable({
  providedIn: 'root'
})
export class DominiosService {

  constructor(private http: HttpClient) { }


  getDominiosAutogestion(dominio: Dominio) {
    return this.http.post(PATH_DOMINIOS, dominio);
  }
  getDominiosMunicipiosByDpto(dominio: Dominio) {
    return this.http.get(PATH_DOMINIOS_MUNICIPIOS + dominio.dominioID +'/entity/' + dominio.tipoDominio);
  }

}
