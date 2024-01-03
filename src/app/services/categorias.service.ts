import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  getCategorias() {
    return this.http.get(`${ this._url }/categorias`)
  }

  editCategoria(id: number, categoria: string) {
    const body = {
      categoria
    }
    return this.http.patch(`${ this._url }/categorias/${ id }`, body)
  }

}
