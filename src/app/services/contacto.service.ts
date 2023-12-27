import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  createContacto(contacto: any) {
    return this.http.post(`${ this._url }/contacto`, contacto)
  }

}
