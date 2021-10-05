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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    
  )
  {}

  ngOnInit() {
    this.paciente = this.route.snapshot.params['paciente'] == "true";

    this.pacienteForm = this.formBuilder.group({
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
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      nickUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      numColegiado: ['', Validators.required]
    });
  }
  goHome() {
    this.router.navigate(['']);
  }

  onSubmit() {
    this.submitted = true;

    // Paciente
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

            this.router.navigate(['']);
          },
          error => {
            alert("Error al crear paciente");
            console.info(error);
          }
      );
    // Medico
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