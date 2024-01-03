import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filial } from '../interfaces/filiales.interface';

@Injectable({
  providedIn: 'root'
})
export class FilialesService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  getFiliales(): Observable<Filial[]> {
    return this.http.get<Filial[]>(`${ this._url }/filiales`)
  }

  addFilial(filial: Filial) {
    return this.http.post(`${ this._url }/filiales`, filial)
  }

  updateFilial(id: number, filial: Filial) {
    return this.http.patch(`${ this._url }/filiales/${ id }`, filial)
  }

  deleteFilial( id: number ) {
    return this.http.delete(`${ this._url }/filiales/${ id }`)
  }
}
