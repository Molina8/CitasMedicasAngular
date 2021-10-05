import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-medico-pacientes',
  templateUrl: './medico-pacientes.component.html',
  styleUrls: ['../../../app.component.css']
})
export class MedicoPacientesComponent implements OnInit {

  medico!: Medico;
  pacientes!: Paciente[];

  constructor(private router: Router, private medicoService: MedicoService) {
    var meddata = localStorage.getItem('Médico');
    if (meddata != null){
      this.medico = JSON.parse(meddata);
    }else
      this.medico = new Medico();
   }

  ngOnInit(): void {

    this.medicoService.getPacientesMedico(this.medico.id)
    .pipe(first())
    .subscribe(
      data => {
      if (data.code == "200"){
        this.pacientes = data.data;
        }else
          alert("Error al listar citas");
      },
      error => {
            alert("Fallo al recibir datos");
            console.info(error);
      });
  }


  verMenu() {
    this.router.navigate(['medico']);
  }

  verPaciente(id: number) {
    var id_pac = JSON.stringify(id);
    localStorage.setItem("pacienteId",id_pac)
    this.router.navigate(['medico/paciente']);
  }

}
