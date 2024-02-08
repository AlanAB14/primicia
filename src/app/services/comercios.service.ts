import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comercio } from '../interfaces/comercios.interface';
import { Categoria } from '../interfaces/categorias.interface';

@Injectable({
  providedIn: 'root'
})
export class ComerciosService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getComercios(): Observable<Comercio[]>{
    return this.http.get<Comercio[]>(`${ this._url }/comercios`)
  }

  getComerciosPorFilial(id: number): Observable<Comercio[]> {
    return this.http.get<Comercio[]>(`${ this._url }/comerciosPorFilial/${ id }`)
  }

  getComerciosPorFilialCategoriaPromocion(obj: any) {
    return this.http.post(`${ this._url }/comerciosPorFilialCategoriaPromocion`, obj)
  }

  getComerciosPorCategoriaYFilial(obj: any): Observable<Comercio[]> {
    return this.http.post<Comercio[]>(`${ this._url }/comerciosPorCategoriaYFilial`, obj)
  }

  getCatComercios(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${ this._url }/categorias`)
  }
  
  getCatComerciosPorId(id: number): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${ this._url }/categorias/${ id }`)
  }

  addComercio(comercio: Comercio) {
    return this.http.post(`${ this._url }/comercios`, comercio)
  }

  updateComercio(comercio: Comercio, id: number) {
    return this.http.patch(`${ this._url }/comercios/${ id }`, comercio)
  }

  deleteComercio(id: number) {
    return this.http.delete(`${ this._url }/comercios/${id}`)
  }
  

}
