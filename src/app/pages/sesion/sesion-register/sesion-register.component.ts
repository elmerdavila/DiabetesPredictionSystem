import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sesion-register',
  templateUrl: './sesion-register.component.html',
  styleUrls: ['./sesion-register.component.css']
})
export class SesionRegisterComponent implements OnInit {

  constructor(
    private router:Router,
    public auth:AuthService
    ) { }

  ngOnInit(): void {
  }

  public goDashboard(){
    this.router.navigate(["/administracion"]);
  }
  async registrar(user:string,pass:string){
    try{
      await this.auth.registrar(user,pass)
      .then(data =>{
        console.log(data);
        this.auth.verificarCorreo()
        alert("Por favor ingrese a su correo electronico para confirmar el registro e ingrese nuevamente en la aplicacion")
      })
      
    }catch (e:any) {
      alert(e.message)
    }
  }
}
