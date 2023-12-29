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

}
