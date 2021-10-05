import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cita } from '../models/cita.model';

const httpOption = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  serverUrl = 'https://localhost:5001/citas'

  constructor(private http: HttpClient) { }


  getCita(id: number) {
    return this.http.get<any>(`${this.serverUrl}/${id}`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCitas() {
    return this.http.get<any[]>(this.serverUrl, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<any>(this.serverUrl, cita, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
