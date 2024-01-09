import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tasa } from '../interfaces/tasas.interface';

@Injectable({
  providedIn: 'root'
})
export class TasasService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  getTasas(): Observable<Tasa[]>{
    return this.http.get<Tasa[]>(`${ this._url }/tasas`)
  }

  updateTasa(tasa: Tasa, id: number) {
    return this.http.patch(`${ this._url }/tasas/${ id }`, tasa)
  }

}
