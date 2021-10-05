import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from '../../../models/cita.model';
import { CitaService } from '../../../services/cita.service';
import { PacienteService } from '../../../services/paciente.service';
import { MedicoService } from '../../../services/medico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Paciente } from 'src/app/models/paciente.model';
import { Medico } from 'src/app/models/medico.model';


@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrls: ['../../../app.component.css']
})
export class CreateCitaComponent implements OnInit {
  pacienteBool!: boolean;
  paciente!: Paciente;
  medico!: Medico;
  pacientes!: Paciente[];
  medicos!: Medico[];
  submitted = false;
  citaForm!: FormGroup;
  medicoo!: Medico;
  pacientee!: Paciente;


  constructor(private router: Router, private formBuilder: FormBuilder,
    private citaService: CitaService, private pacienteService: PacienteService,
     private medicoService: MedicoService) { 

    var usuario = localStorage.getItem("Usuario");
    if (usuario=="Paciente"){
      this.pacienteBool = true;
    }else{
      this.pacienteBool = false;
    }

    if (!this.pacienteBool){
      var dataMedico = localStorage.getItem('Médico');
      if (dataMedico != null){this.medico = JSON.parse(dataMedico);}
    }else{
      var dataPaciente = localStorage.getItem('Paciente');
      if (dataPaciente != null){this.paciente = JSON.parse(dataPaciente);}
      }
      this.medicos = []
      this.pacientes = []
    }
  

  ngOnInit() {

    this.medicoService.getAllMedicos()
    .pipe(first())
    .subscribe(
      data => {
        console.info("GetAllMedicos");
        for (var medicoJs in data.data){
          this.medicoo= JSON.parse(medicoJs);
          this.medicos.push(this.medicoo); 
        }
        this.medicos = data.data;
        console.info(this.medicos);
      },
      error => {
        alert("Error GetAllMedicos");
        console.info(error);
      }
  );
  
  this.pacienteService.getAllPacientes()
    .pipe(first())
    .subscribe(
      data => {
        console.info("GetAllPacientes");
        for (var pacienteJs in data.data){
          this.pacientee = JSON.parse(pacienteJs);
          this.pacientes.push(this.pacientee); 
        }
        this.pacientes = data.data;
        console.info(this.pacientes);
      },
      error => {
        alert("Error GetAllMedicos");
        console.info(error);
      }  
    );

    this.citaForm = this.formBuilder.group({
      motivoCita: ['', Validators.required],
      fechaHora: ['', Validators.required],
      medico: ['', Validators.required],
      paciente: ['', Validators.required]
    });

  }

  onSubmit(){


    if (this.citaForm.invalid){
      alert("Error de validación");
      console.info("Error de validación");
      console.info(this.citaForm.getError);
      console.info(this.citaForm.controls);
      console.info(this.citaForm.status);
      console.info(this.citaForm.value);
      return;
    }
      
    this.citaService.createCita(this.citaForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert("Cita creada correctamente");
          console.info(data); 
          this.verCitas();
        },
        error => {
          alert("Error al crear cita");
          console.info(error);
        }
    );
  }

    verMenu() {
      localStorage.clear();
      if (this.pacienteBool){
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
    if (this.pacienteBool){
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
