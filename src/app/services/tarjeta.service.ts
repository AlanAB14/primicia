import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TarjetaData } from '../interfaces/tarjetaData.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  getSolicitudesTarjeta(): Observable<TarjetaData[]> {
    return this.http.get<TarjetaData[]>(`${ this._url }/tarjeta`)
  }

  createSolicitudTarjeta( tarjetaData: TarjetaData ) {
    return this.http.post(`${ this._url }/tarjeta`, tarjetaData)
  }

  deleteSolicitudTarjeta(id: number) {
    return this.http.delete(`${ this._url }/tarjeta/${ id }`)
  }

}
