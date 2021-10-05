import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { Router } from '@angular/router';
import { Cita } from 'src/app/models/cita.model';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-medico-citas',
  templateUrl: './medico-citas.component.html',
  styleUrls: ['../../../app.component.css']
})
export class MedicoCitasComponent implements OnInit {

  medico!: Medico;
  citas!: Cita[];

  constructor(private router: Router, private medicoService: MedicoService) {
    var meddata = localStorage.getItem('Médico');
    if (meddata != null)
      this.medico = JSON.parse(meddata);

    
  }

  ngOnInit() {
    
    this.medicoService.getCitasMedico(this.medico.id)
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
    this.router.navigate(['medico']);
  }

  verPaciente(id: number) {
    var id_pac = JSON.stringify(id);
    localStorage.setItem("pacienteId",id_pac);
    this.router.navigate(['medico/paciente']);
  }

  verDiagnostico(id: number) {
    var id_dia = JSON.stringify(id);
    localStorage.setItem("diaId",id_dia);
    this.router.navigate(['medico/diagnostico']);
  }


}
