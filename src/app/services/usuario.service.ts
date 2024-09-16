import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActualizarUsuarioDto } from '../models/actualizarUsuarioDTO';
import { PATH_ACTUALIZAR_USUARIO } from '../shared/constantes';


@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
  
    constructor(private http: HttpClient) { 

    }

    actualizarUsuario(data:ActualizarUsuarioDto): Observable<any>{      
      return this.http.post(PATH_ACTUALIZAR_USUARIO ,data);  
    }

  }