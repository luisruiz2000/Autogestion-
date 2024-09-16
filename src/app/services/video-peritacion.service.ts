import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PATH_GET_LINK_VIDEO_PERITACION
} from '../shared/constantes';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class VideoPeritacionService {

  usuario!: Usuario;

  constructor(
    private http: HttpClient
    ) { }

  consultarLink(solicitud: any): Observable<any>{
    return this.http.post<any>(PATH_GET_LINK_VIDEO_PERITACION, solicitud);
  }

}
