import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TarjetaData } from '../interfaces/tarjetaData.interface';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  createSolicitudTarjeta( tarjetaData: TarjetaData ) {
    return this.http.post(`${ this._url }/tarjeta`, tarjetaData)
  }

}
