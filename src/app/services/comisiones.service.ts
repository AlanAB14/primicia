import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comision } from '../interfaces/comision.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComisionesService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getComisiones(): Observable<Comision[]>{
    return this.http.get<Comision[]>(`${ this._url }/comisiones`)
  }

  updateComision(comision: Comision, id: number) {
    return this.http.patch(`${ this._url }/comisiones/${ id }`, comision)
  }
}
