import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../models/paciente.model';
import { Medico } from '../../../models/medico.model';
import { Cita } from '../../../models/cita.model';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { CitaService } from '../../../services/cita.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-diagnostico',
  templateUrl: './create-diagnostico.component.html',
  styleUrls: ['../../../app.component.css']
})
export class CreateDiagnosticoComponent implements OnInit {

  submitted = false;
  diagnosticoForm!: FormGroup;
  medicoBool!: boolean;
  paciente!: Paciente;
  medico!: Medico;
  citas!: Cita[];
  cita!: Cita;

  constructor(private router: Router, private formBuilder: FormBuilder,
     private diagnosticoService: DiagnosticoService, private citaService: CitaService) {

      var usuario = localStorage.getItem("Usuario");
      if (usuario=="Paciente"){
        this.medicoBool = false;
      }else{
        this.medicoBool = true;
      }
  
      if (this.medicoBool){
        var dataMedico = localStorage.getItem('Médico');
        if (dataMedico != null){this.medico = JSON.parse(dataMedico);}
      }else{
        var dataPaciente = localStorage.getItem('Paciente');
        if (dataPaciente != null){this.paciente = JSON.parse(dataPaciente);}
        }

      this.citas = [];
    }

  ngOnInit(): void {

    this.diagnosticoForm = this.formBuilder.group({
      id: ['', Validators.required],
      valoracionEspecialista: ['', Validators.required],
      enfermedad: ['', Validators.required]
    });


  }

  onSubmit() {
    if (this.diagnosticoForm.invalid){
      alert("Error de validación")
      return;
    }
      
    this.diagnosticoService.createDiagnostico(this.diagnosticoForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert("Diagnóstico creado correctamente");
          console.info(data);
          this.verCitas();
        },
        error => {
          alert("Error al crear diagnóstico");
          console.info(error);
        }
    );
  }

  verMenu() {
    localStorage.clear();
    if (!this.medicoBool){
      var pacData = JSON.stringify(this.paciente);
      localStorage.setItem("Paciente",pacData);
      this.router.navigate(['paciente']);
    }else{
      var medData = JSON.stringify(this.medico);
      localStorage.setItem("Médico",medData);
      this.router.navigate(['medico']);
    }
  }

  verCitas() {
    localStorage.clear();
    if (!this.medicoBool){
      var pacData = JSON.stringify(this.paciente);
      localStorage.setItem("Paciente",pacData);
      this.router.navigate(['paciente/citas']);
    }else{
      var medData = JSON.stringify(this.medico);
      localStorage.setItem("Médico",medData);
      this.router.navigate(['medico/citas']);
    }
  }

}
