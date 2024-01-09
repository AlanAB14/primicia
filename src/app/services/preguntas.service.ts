import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pregunta } from '../interfaces/preguntas.interface';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  getPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${ this._url }/preguntas`)
  }

  addPregunta(pregunta: Pregunta) {
    return this.http.post(`${ this._url }/preguntas`, pregunta)
  }

  updatePregunta(id: number, pregunta: Pregunta) {
    return this.http.patch(`${ this._url }/preguntas/${ id }`, pregunta)
  }

  deletePregunta(id: number) {
    return this.http.delete(`${ this._url }/preguntas/${ id }`)
  }

}
