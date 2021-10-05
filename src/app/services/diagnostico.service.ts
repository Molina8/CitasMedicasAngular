import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Diagnostico } from '../models/diagnostico.model';


const httpOption = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  serverUrl = 'https://localhost:5001/diagnosticos'

  constructor(private http: HttpClient) { }


  getDiagnostico(id: number) {
    return this.http.get<any>(`${this.serverUrl}/${id}`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDiagnosticos() {
    return this.http.get<any[]>(this.serverUrl, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  createDiagnostico(diagnostico: Diagnostico) : Observable<Diagnostico> {
    return this.http.post<Diagnostico>(this.serverUrl, diagnostico, httpOption)
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
