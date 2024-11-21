import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Funcion } from '../interfaces/funcion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilitarFuncionService {

  private _url = environment.apiBase
  funciones: Funcion[] = [];

  constructor(private http: HttpClient) { }

  setFunciones(funciones: Funcion[]) {
    this.funciones = funciones;
  }

  getHabilitarFunciones():  Observable<Funcion[]>{
    return this.http.get<Funcion[]>(`${ this._url }/habilitarFuncion`)
  }

  getHabilitarFuncion(id: number): Observable<Funcion> {
    return this.http.get<Funcion>(`${ this._url }/habilitarFuncion/${ id }`)
  }

  updateHabilitarFuncion(funcion: Funcion): Observable<Funcion>{
    return this.http.patch<Funcion>(`${ this._url }/habilitarFuncion/${ funcion.id }`, funcion)
  }

}
