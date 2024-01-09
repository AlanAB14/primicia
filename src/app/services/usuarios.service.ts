import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) {}

  getUsuarios() {
    return this.http.get(`${ this._url }/usuarios`)
  }

  addUsuario(data: any) {
    return this.http.post(`${ this._url }/usuarios/register`, data)
  }

  updateUsuario(id: number, data: any) {
    return this.http.patch(`${ this._url }/usuarios/${ id }`, data)
  }
  
  deleteUsuario(id: number) {
    return this.http.delete(`${ this._url }/usuarios/${ id }`)
  }

}
