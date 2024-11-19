import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Promocion } from '../interfaces/promocion.interface';

@Injectable({
  providedIn: 'root'
})
export class PromocionEspecialService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getPromociones(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(`${ this._url }/promocionesEspeciales`)
  }

  getPromocionesConImagen(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(`${ this._url }/promocionesEspecialesConImagen`)
  }

  addPromocion(promocion: Promocion) {
    return this.http.post(`${ this._url }/promocionesEspeciales`, promocion)
  }

  updatePromocion(promocion: Promocion, id: number): Observable<Promocion> {
    return this.http.patch<Promocion>(`${ this._url }/promocionesEspeciales/${ id }`, promocion)
  }

  deletePromocion(id: number) {
    return this.http.delete(`${ this._url }/promocionesEspeciales/${ id }`)
  }

}
