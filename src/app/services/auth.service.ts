import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autenticacion } from '../models/autenticacion';
import {
  PATH_LOGIN,
  PATH_REGISTRO_USUARIO,
  PATH_TYC,
  PATH_SOLICITAR_CAMBIO,
  PATH_COMPARAR_CADENA,
  PATH_RECUPERAR_CONTRASENA,
  PATH_VALIDAR_REGISTRO,
  PATH_LOGOUT,
  PATH_REFRESH_TOKEN
} from '../shared/constantes';
import { Usuario } from '../models/usuario';
import { cambioContrasena } from '../models/cambioContrasena';
import { ValidarRegistroDTO } from '../models/validarRegistro';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(autenticacion: Autenticacion): Observable<any> {
    //this.divipola();
    return this.http.post(PATH_LOGIN, autenticacion);
  }

  refrescarToken(): Observable<any>{
    return this.http.get(PATH_REFRESH_TOKEN);
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(PATH_REGISTRO_USUARIO, usuario);
  }

  tyc():Observable<any>{
    return this.http.get(PATH_TYC);
  }

  solicitarCambioContrasena(email: cambioContrasena):Observable<any>{
    return this.http.post(PATH_SOLICITAR_CAMBIO,email);
  }

  compararCadena(cadena:cambioContrasena): Observable<any>{
    return this.http.post(PATH_COMPARAR_CADENA,cadena);
  }

  recuperarContrasena(nuevaContrasena:cambioContrasena):Observable<any>{
    return this.http.post(PATH_RECUPERAR_CONTRASENA,nuevaContrasena);
  }

  validarRegistro(validarRegistroDTO: ValidarRegistroDTO): Observable<any> {
    return this.http.post(PATH_VALIDAR_REGISTRO, validarRegistroDTO);
  }
  logout(autenticacion: Autenticacion): Observable<any> {
    return this.http.post(PATH_LOGOUT, autenticacion);
  }
  divipola() {
     this.http.get("http://10.1.140.110:8077/api/divipola/verificar?code=0&name=meta").subscribe((result: any) => console.log("divipola-> " + result ));
    
  
  }
  
}
