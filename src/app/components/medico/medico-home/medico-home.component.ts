import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-home',
  templateUrl: './medico-home.component.html',
  styleUrls: ['../../../app.component.css']
})
export class MedicoHomeComponent implements OnInit {

  medico!: Medico;

  constructor(private router: Router) {
    var data = localStorage.getItem('Médico');
    if (data != null){
      this.medico = JSON.parse(data);
    }else
      this.medico = new Medico();
    
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['medico']);
  }

  verCitas() {
    this.router.navigate(['medico/citas']);
  }

  verPacientes() {
    this.router.navigate(['medico/pacientes']);
  }

  crearCita() {
    localStorage.setItem("Usuario","Médico");
    this.router.navigate(['cita/crear']);
  }

  crearDiagnostico() {
    localStorage.setItem("Usuario","Médico");
    this.router.navigate(['diagnostico/crear']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}