import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categorias.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${ this._url }/categorias`)
  }

  editCategoria(id: number, categoria: string) {
    let categoriaMinuscula = categoria.toLowerCase();
    let categoriaTransformada = categoriaMinuscula.charAt(0).toUpperCase() + categoriaMinuscula.slice(1)
    const body = {
      categoria: categoriaTransformada
    }
    return this.http.patch(`${ this._url }/categorias/${ id }`, body)
  }

  addCategoria(categoria: string) {
    let categoriaMinuscula = categoria.toLowerCase();
    let categoriaTransformada = categoriaMinuscula.charAt(0).toUpperCase() + categoriaMinuscula.slice(1)
    const body = {
      categoria: categoriaTransformada
    }
    return this.http.post(`${ this._url }/categorias`, body)
  }

  deleteCategoria(id: number) {
    return this.http.delete(`${ this._url }/categorias/${ id }`)
  }

}
