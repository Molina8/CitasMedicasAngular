import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { Paciente } from '../../../models/paciente.model';
import { MedicoService } from '../../../services/medico.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-paciente-medico',
  templateUrl: './paciente-medico.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PacienteMedicoComponent implements OnInit {

  paciente!: Paciente;
  medico!: Medico;
  medicoId!: number;

  constructor(private router: Router, private medicoService: MedicoService) { }

  ngOnInit(){

    var jsonMed = localStorage.getItem("medicoId");
    var jsonPac = localStorage.getItem("Paciente");

    if (jsonPac != null)
      this.paciente = JSON.parse(jsonPac);
    if (jsonMed != null)
      this.medicoId = JSON.parse(jsonMed);

      this.medicoService.getMedico(this.medicoId)
      .pipe(first())
      .subscribe(
        data=>{
          if (data.code = "200") {
            this.medico=data.data;
          }else {
            alert("El médico no existe");
            console.info(data.data);
          }
        },
        error => {
          alert("Error");
          console.info(error);
        });
  }

  verMenu() {
    this.router.navigate(['paciente']);
  }

  verCitas() {
    this.router.navigate(['paciente/citas']);
  }

}
