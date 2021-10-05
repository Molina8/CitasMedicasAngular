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
    this.router.navigate(['login', { rol: this.rolUsuario }]);

  }

  goRegistration() {
    this.router.navigate(['registration', { rol: this.rolUsuario }]);
  }

  chooseRol(rolUsuario: string) {
    this.rolUsuario = rolUsuario;
    this.chosenRol = true;
  }

}