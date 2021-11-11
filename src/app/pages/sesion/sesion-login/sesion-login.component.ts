import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sesion-login',
  templateUrl: './sesion-login.component.html',
  styleUrls: ['./sesion-login.component.css']
})
export class SesionLoginComponent implements OnInit {

  constructor(
    private router:Router,
    public auth:AuthService
    ) {
      
     }

  ngOnInit(): void {
  }

  async login(user:string,pass:string){
    try{
      await this.auth.login(user,pass)
      .then(data =>{
        console.log(data);
        if (data.user.emailVerified){
          this.goDashboard();
        }else{
          alert("Por favor ingrese a su correo electronico para confirmar el registro e ingrese nuevamente en la aplicacion");
        }
        
      })
      
    }catch (e:any) {
      alert(e.message)
    }
  }
  public goDashboard(){    
    this.router.navigate(["/administracion"]);    
  }

}
