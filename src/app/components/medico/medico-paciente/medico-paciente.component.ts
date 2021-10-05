import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { Paciente } from '../../../models/paciente.model';
import { PacienteService } from '../../../services/paciente.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-medico-paciente',
  templateUrl: './medico-paciente.component.html',
  styleUrls: ['../../../app.component.css']
})
export class MedicoPacienteComponent implements OnInit {

  medico!: Medico;
  paciente!: Paciente;
  pacienteId!: number;

  constructor(private router: Router, private pacienteService: PacienteService) {

      var jsonMed = localStorage.getItem("Médico");
      var jsonPac = localStorage.getItem("pacienteId");
  
      if (jsonMed != null)
        this.medico = JSON.parse(jsonMed);
      if (jsonPac != null)
        this.pacienteId = parseInt(JSON.parse(jsonPac));
    }

  ngOnInit() {

      this.pacienteService.getPaciente(this.pacienteId)
      .pipe(first())
      .subscribe(
        data=>{
          if (data.code = "200") {
            this.paciente=data.data;
          }else {
            alert("El paciente no existe");
            console.info(data.data);
          }
        },          
        error => {
          alert("Error");
          console.info(error);
        });
    }
  

  verMenu() {
    this.router.navigate(['medico']);
  }

  verCitas() {
    this.router.navigate(['medico/citas']);
  }
  
}
