import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion-register',
  templateUrl: './sesion-register.component.html',
  styleUrls: ['./sesion-register.component.css']
})
export class SesionRegisterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public goDashboard(){
    this.router.navigate(["/administracion"]);
  }

}
