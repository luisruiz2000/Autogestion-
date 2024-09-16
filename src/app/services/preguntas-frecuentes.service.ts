import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  PATH_PREGUNTAS_FRECUENTES_LISTA
} from "../shared/constantes";

@Injectable({
  providedIn: 'root'
})
export class PreguntasFrecuentesService {

  constructor(private http: HttpClient) { }

  listFAQ(): Observable<any> {
    return this.http.get(PATH_PREGUNTAS_FRECUENTES_LISTA);
  }
}
