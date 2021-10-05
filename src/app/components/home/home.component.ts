import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app.component.css']
})
export class HomeComponent implements OnInit {

  logged: boolean;
  chosenRol: boolean;
  rolUsuario: string;

  constructor(private router: Router) {
    this.logged = false;
    this.chosenRol = false;
    this.rolUsuario = "";
  }

  ngOnInit() {
  }

  goLogin() {
    localStorage.setItem("Usuario",this.rolUsuario);
    this.router.navigate(['login']);

  }

  goRegistration() {
    localStorage.setItem("Usuario",this.rolUsuario);
    this.router.navigate(['registration']);
  }

  chooseRol(rolUsuario: string) {
    this.rolUsuario = rolUsuario;
    this.chosenRol = true;
  }

}