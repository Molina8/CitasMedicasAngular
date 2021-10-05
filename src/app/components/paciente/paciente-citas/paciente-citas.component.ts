import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../models/paciente.model';
import { PacienteService } from '../../../services/paciente.service';
import { Router } from '@angular/router';
import { Cita } from 'src/app/models/cita.model';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-paciente-citas',
  templateUrl: './paciente-citas.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PacienteCitasComponent implements OnInit {

  paciente!: Paciente;
  citas!: Cita[];

  constructor(private router: Router, private pacienteService: PacienteService) {
    var pacdata = localStorage.getItem('Paciente');
    if (pacdata != null)
      this.paciente = JSON.parse(pacdata);    

  }

  ngOnInit() {
    
    this.pacienteService.getCitasPaciente(this.paciente.id)
    .pipe(first())
    .subscribe(
      data => {
      if (data.code == "200"){
        this.citas = data.data;
        }else
          alert(data.data);
      },
      error => {
            alert("Fallo al recibir datos");
            console.info(error);
      });
  }

  verMenu() {
    this.router.navigate(['paciente']);
  }

  verMedico(id: number) {
    var id_med = JSON.stringify(id);
    localStorage.setItem("medicoId",id_med);
    this.router.navigate(['paciente/medico']);
  }

  verDiagnostico(id: number) {
    var id_dia = JSON.stringify(id);
    localStorage.setItem("diaId",id_dia);
    this.router.navigate(['paciente/diagnostico']);
  }

}
