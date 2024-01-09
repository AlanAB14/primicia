import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto } from '../interfaces/contacto.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  createContacto(contacto: any) {
    return this.http.post(`${ this._url }/contacto`, contacto)
  }

  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(`${ this._url }/contacto`)
  }

  deleteContacto(id: number) {
    return this.http.delete(`${ this._url }/contacto/${ id }`)
  }

}
