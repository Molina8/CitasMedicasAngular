import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../models/paciente.model';
import { Router } from '@angular/router';
import { Diagnostico } from 'src/app/models/diagnostico.model';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-paciente-diagnostico',
  templateUrl: './paciente-diagnostico.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PacienteDiagnosticoComponent implements OnInit {

  paciente!: Paciente;
  diagnostico!: Diagnostico;

  constructor(private router: Router, private diagnosticoService: DiagnosticoService) { }

  ngOnInit(): void {
    var jsonPac = localStorage.getItem("Paciente");
    var jsonDia = localStorage.getItem("diaId");
    if (jsonPac != null)
      this.paciente = JSON.parse(jsonPac);
    if (jsonDia != null){
      var diaId = JSON.parse(jsonDia);
      this.diagnosticoService.getDiagnostico(diaId)
      .pipe(first())
      .subscribe(
        data=>{
          if (data.code == "200") {
            this.diagnostico=data.data;
          }else {
            alert("El diagnóstico no existe")
            this.router.navigate(['paciente/citas']);
          }
        });
    }
  }

  verMenu() {
    this.router.navigate(['paciente']);
  }

  verCitas() {
    this.router.navigate(['paciente/citas']);
  }

}
