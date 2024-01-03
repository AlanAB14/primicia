import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Promocion } from '../interfaces/promocion.interface';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getPromociones(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(`${ this._url }/promociones`)
  }

  addPromocion(promocion: Promocion) {
    return this.http.post(`${ this._url }/promociones`, promocion)
  }

  updatePromocion(promocion: Promocion, id: number): Observable<Promocion> {
    console.log(promocion, 'Promocion')
    return this.http.patch<Promocion>(`${ this._url }/promociones/${ id }`, promocion)
  }

  deletePromocion(id: number) {
    return this.http.delete(`${ this._url }/promociones/${ id }`)
  }

}
