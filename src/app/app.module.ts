import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MedicoHomeComponent } from './components/medico/medico-home/medico-home.component';
import { MedicoCitasComponent } from './components/medico/medico-citas/medico-citas.component';
import { MedicoPacientesComponent } from './components/medico/medico-pacientes/medico-pacientes.component';
import { MedicoPacienteComponent } from './components/medico/medico-paciente/medico-paciente.component';
import { MedicoDiagnosticoComponent } from './components/medico/medico-diagnostico/medico-diagnostico.component';
import { PacienteHomeComponent } from './components/paciente/paciente-home/paciente-home.component';
import { PacienteCitasComponent } from './components/paciente/paciente-citas/paciente-citas.component';
import { PacienteMedicosComponent } from './components/paciente/paciente-medicos/paciente-medicos.component';
import { PacienteMedicoComponent } from './components/paciente/paciente-medico/paciente-medico.component';
import { PacienteDiagnosticoComponent } from './components/paciente/paciente-diagnostico/paciente-diagnostico.component';
import { CreateDiagnosticoComponent } from './components/diagnostico/create-diagnostico/create-diagnostico.component';
import { CreateCitaComponent } from './components/cita/create-cita/create-cita.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MedicoHomeComponent,
    PacienteHomeComponent,
    RegistrationComponent,
    MedicoCitasComponent,
    MedicoPacientesComponent,
    MedicoPacienteComponent,
    MedicoDiagnosticoComponent,
    PacienteCitasComponent,
    PacienteMedicosComponent,
    PacienteMedicoComponent,
    PacienteDiagnosticoComponent,
    CreateDiagnosticoComponent,
    CreateCitaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: RegistrationComponent},
      { path: 'medico', component: MedicoHomeComponent},
      { path: 'medico/citas', component: MedicoCitasComponent},
      { path: 'medico/pacientes', component: MedicoPacientesComponent},
      { path: 'medico/paciente', component: MedicoPacienteComponent},
      { path: 'medico/diagnostico', component: MedicoDiagnosticoComponent },
      { path: 'paciente', component: PacienteHomeComponent },
      { path: 'paciente/citas', component: PacienteCitasComponent },
      { path: 'paciente/medicos', component: PacienteMedicosComponent },
      { path: 'paciente/medico', component: PacienteMedicoComponent },
      { path: 'paciente/diagnostico', component: PacienteDiagnosticoComponent },
      { path: 'cita/crear', component: CreateCitaComponent },
      { path: 'diagnostico/crear', component: CreateDiagnosticoComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
