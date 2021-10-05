import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MedicoService } from '../../services/medico.service';
import { PacienteService } from '../../services/paciente.service';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css']
})
export class LoginComponent implements OnInit {

  submitted!: boolean; // Eliminar propiedad¿?
  loginForm!: FormGroup;
  rolUsuario!: string;
  loginData!: Login;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,
              private router: Router, private medicoService: MedicoService, private pacienteService: PacienteService) 
              {
                this.rolUsuario = this.route.snapshot.params['rol'];
               }

  ngOnInit() {
    console.info("LOGIN - ngOnInit"); 
    this.loginForm = this.formBuilder.group({
      nickUsuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  goHome() {
    console.info("LOGIN - goHome");
    this.router.navigate(['']);
    this.router.navigate(['']);
  }

  onSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }  

    if (this.rolUsuario == "Paciente") {
      this.loginData = this.loginForm.value;
      this.pacienteService.login(this.loginData)
        .pipe(first())
        .subscribe(
          data => {
            if (data.code == "200"){
              var pacData = JSON.stringify(data.data)
              localStorage.setItem("Paciente",pacData)
              this.router.navigate(['paciente']);
            }else{
              alert("Datos incorrectos al iniciar sesión");
              this.router.navigate(['/']);
            }
          },
          error => {
            alert("Fallo al iniciar sesión");
            this.router.navigate(['/']);
          });
    }
    else
    {
      this.loginData = this.loginForm.value;
      this.medicoService.login(this.loginData)
        .pipe(first())
        .subscribe(
          data => {
            if (data.code == "200"){
              var medData = JSON.stringify(data.data)
              localStorage.setItem("Médico",medData)
              this.router.navigate(['medico']);
            }else{
              alert("Datos incorrectos al iniciar sesión");
              this.router.navigate(['/']);
            }
          },
          error => {
            alert("Fallo al iniciar sesión");
            this.router.navigate(['/']);
          });
    }
  }
}