import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion-login',
  templateUrl: './sesion-login.component.html',
  styleUrls: ['./sesion-login.component.css']
})
export class SesionLoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public goDashboard(){
    
    this.router.navigate(["/administracion"]);
    
  }

}
