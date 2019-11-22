import {
  Observable,
  throwError
} from 'rxjs';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {
  catchError,
  map
} from 'rxjs/operators';
import {
  Injectable
} from '@angular/core';

import {
  Url,
  Apis
} from '../index.url';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(public http: HttpClient) {}

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
    return body || {};
  }

  handleGetPerfil(id: string): Observable < any > {
    let apiUrl = `${Url + Apis.getPerfil + '&usuario=' + id} `;

    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  handleGetPassword(id: string): Observable < any > {
    let apiUrl = `${Url + Apis.getPassword + id} `;

    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  handleGetAjustes(id: string): Observable < any > {
    let apiUrl = `${Url + Apis.getAjustes + id} `;

    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  handleGetFoto(id: string): Observable < any > {
    let apiUrl = `${Url + Apis.getFoto + id} `;

    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  handleUpdatePerfil(usuario: string, nombre:string, mail:string,telefono:string): Observable < any > {
    let data = new FormData();
    data.append('request','set_perfil');
    let apiUrl = `${Url + Apis.putPerfil} `;
    
    data.append('usuario',usuario);
    data.append('nombre',nombre);
    data.append('mail',mail);  
    data.append('telefono',telefono);

    return this.http.post(apiUrl, data).pipe(
      map(this.extractData), 
      catchError(this.handleError));
  }
}