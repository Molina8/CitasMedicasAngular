import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { Medico } from '../models/medico.model';

const httpOption = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  serverUrl = 'https://localhost:5001/medicos'

  constructor(private http: HttpClient) { }


  login(loginData: Login) {
    return this.http.post<any>(`${this.serverUrl}/login`, loginData)
      .pipe(
        catchError(this.handleError)
      );
  }

  registration(medico: Medico): Observable<Medico> {
    return this.http.post<any>(this.serverUrl, medico, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMedico(id: number) {
    return this.http.get<any>(`${this.serverUrl}/${id}`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllMedicos() {
    return this.http.get<any>(this.serverUrl, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCitasMedico(id: number) {
    return this.http.get<any>(`${this.serverUrl}/${id}/citas`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPacientesMedico(id: number) {
    return this.http.get<any>(`${this.serverUrl}/${id}/pacientes`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDiagnosticosMedico(id: number) {
    return this.http.get<any>(`${this.serverUrl}/${id}/diagnosticos`, httpOption)
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