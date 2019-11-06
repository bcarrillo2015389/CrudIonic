import { Observable, throwError } from 'rxjs';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Url, Apis } from '../index.url';

// HttoOptions : Indica que sera el content Type por Json
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(public http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  handleGetDataPlayers(): Observable<any> {

    let apiUrl = `${Url + Apis.getPlayers } `;
    console.log(apiUrl);
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  handleGetDataPlayer(id_user:string): Observable<any> {
    let apiUrl = `${Url + Apis.getPlayer+id_user } `;
    console.log(apiUrl);

    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getPosicion(): Observable<any> {
    let apiUrl = `${Url + Apis.getPosicion } `;
    console.log(apiUrl);
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postJugador(nombre:string,equipo:string,numero:string,posicion:string):Observable<any> {
    let data = new FormData();
    data.append('request','grabar');
    let apiUrl = `${Url + Apis.postJugador} `;
    
    data.append('nombre',nombre);
    data.append('equipo',equipo);
    data.append('numero',numero);  
    data.append('posicion',posicion);

    console.log(apiUrl);
    
    return this.http.post(apiUrl, data).pipe(
      map(this.extractData), 
      catchError(this.handleError));
  }

  deleteJugador(id_user:string):Observable<any> {

    let data = new FormData();
    data.append('request','situacion');
    let apiUrl = `${Url + Apis.deleteJugador} `;
    data.append('codigo',id_user);
    data.append('situacion','2');

    console.log(apiUrl);
    
    return this.http.post(apiUrl, data).pipe(
      map(this.extractData), 
      catchError(this.handleError));
  }

  updateJugador(id_user:string,nombre:string,equipo:string,numero:string,posicion:string):Observable<any> {

    let data = new FormData();
    data.append('request','modificar');
    let apiUrl = `${Url + Apis.deleteJugador} `;
    data.append('codigo',id_user);
    data.append('nombre',nombre);
    data.append('equipo',equipo);
    data.append('numero',numero);
    data.append('posicion',posicion);

    console.log(apiUrl);
    
    return this.http.post(apiUrl, data).pipe(
      map(this.extractData), 
      catchError(this.handleError));
  }

}
