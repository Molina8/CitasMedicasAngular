import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Diagnostico } from 'src/app/models/diagnostico.model';

@Component({
  selector: 'app-medico-diagnostico',
  templateUrl: './medico-diagnostico.component.html',
  styleUrls: ['../../../app.component.css']
})
export class MedicoDiagnosticoComponent implements OnInit {

  medico!: Medico;
  diagnostico!: Diagnostico;

  constructor(private router: Router, private diagnosticoService: DiagnosticoService) {}

  ngOnInit() {
    var jsonMed = localStorage.getItem("Médico");
    var jsonDia = localStorage.getItem("diaId");
    if (jsonMed != null)
      this.medico = JSON.parse(jsonMed);
    if (jsonDia != null){
      var diaId = JSON.parse(jsonDia);
      this.diagnosticoService.getDiagnostico(diaId)
      .pipe(first())
      .subscribe(
        data=>{
          if (data.code == "200") {
            this.diagnostico=data.data;
          }else {
            alert("El diagnóstico no existe");
            this.router.navigate(['medico/citas']);
          }
        });
    }else{
      alert("Error")
    }
  }

  verMenu() {
    this.router.navigate(['medico']);
  }

  verCitas() {
    this.router.navigate(['medico/citas']);
  }

}
