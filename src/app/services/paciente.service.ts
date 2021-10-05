import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Paciente } from '../models/paciente.model';
import { Login } from '../models/login.model';


const httpOption = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class PacienteService {
   
  serverUrl = 'https://localhost:5001/pacientes'

  constructor(private http: HttpClient) { }

  login(loginData: Login) {
    return this.http.post<any>(`${this.serverUrl}/login`, loginData)
    .pipe(
      catchError(this.handleError)
    );
  }

  registration(paciente: Paciente) : Observable<Paciente> {
    return this.http.post<any>(this.serverUrl, paciente, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPaciente(id: number) {
    return this.http.get<any>(`${this.serverUrl}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getAllPacientes() {
    return this.http.get<any>(this.serverUrl, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCitasPaciente(id: number) {
    return this.http.get<any>(`${this.serverUrl}/${id}/citas`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMedicosPaciente(id: number) {
    return this.http.get<any>(`${this.serverUrl}/${id}/medicos`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDiagnosticosPaciente(id: number) {
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