import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { PacienteService } from '../../../services/paciente.service';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-medicos',
  templateUrl: './paciente-medicos.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PacienteMedicosComponent implements OnInit {

  paciente!: Paciente;
  medicos!: Medico[];

  constructor(private router: Router, private pacienteService: PacienteService) {
    var pacdata = localStorage.getItem('Paciente');
    if (pacdata != null){
      this.paciente = JSON.parse(pacdata);
    }else
      this.paciente = new Paciente();
   }

  ngOnInit(): void {

    this.pacienteService.getMedicosPaciente(this.paciente.id)
    .pipe(first())
    .subscribe(
      data => {
      if (data.code == "200"){
        this.medicos = data.data;
        }else
          alert("Error al listar citas");
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
    const id_med = JSON.stringify(id);
    localStorage.setItem("medicoId",id_med);
    this.router.navigate(['paciente/medico']);
  }

}
