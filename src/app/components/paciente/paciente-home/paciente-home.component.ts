import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../models/paciente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-home',
  templateUrl: './paciente-home.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PacienteHomeComponent implements OnInit {

  paciente!: Paciente;

  constructor(private router: Router) {
    var data = localStorage.getItem('Paciente');
    if (data != null){
      this.paciente = JSON.parse(data);
    }else
      this.paciente = new Paciente();
    
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['paciente']);
  }

  verCitas() {
    this.router.navigate(['paciente/citas']);
  }

  verMedicos() {
    this.router.navigate(['paciente/medicos']);
  }

  crearCita() {
    localStorage.setItem("Usuario","Paciente");
    this.router.navigate(['cita/crear']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}