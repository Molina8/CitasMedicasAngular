import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import { PacienteService } from '../../services/paciente.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../../app.component.css']
})
export class RegistrationComponent implements OnInit {

  paciente!: boolean;
  submitted = false;
  pacienteForm!: FormGroup;
  medicoForm!: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder,
    private medicoService: MedicoService,private pacienteService: PacienteService){
      var usuario = localStorage.getItem("Usuario");
      if (usuario=="Paciente")
        this.paciente = true;
      else
        this.paciente = false;
    }

  ngOnInit() {
    
    this.pacienteForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      nickUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      nss: ['', Validators.required],
      numTarjeta: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.medicoForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      nickUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      numColegiado: ['', Validators.required]
    });
  }
  goHome() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.paciente) {
      if (this.pacienteForm.invalid) {
        alert("Error de validación")
        return;
      }
        
      this.pacienteService.registration(this.pacienteForm.value)
        .pipe(first())
        .subscribe(
          data => {
            alert("Paciente creado");
            console.info(data);
            localStorage.clear();
            this.router.navigate(['']);
          },
          error => {
            alert("Error al crear paciente");
            console.info(error);
          }
      );
    } else {
      if (this.medicoForm.invalid){
        alert("Error de validación")
        return;
      }
        
      this.medicoService.registration(this.medicoForm.value)
        .pipe(first())
        .subscribe(
          data => {
            alert("Médico creado");
            console.info(data);
            localStorage.clear();
            this.router.navigate(['']);
          },
          error => {
            alert("Error al crear médico");
            console.info(error);
          }
      );
    }
  }
}