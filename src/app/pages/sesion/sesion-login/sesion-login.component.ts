import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-sesion-login',
  templateUrl: './sesion-login.component.html',
  styleUrls: ['./sesion-login.component.css']
})
export class SesionLoginComponent implements OnInit {

  constructor(
    private router:Router,
    public auth:AuthService,
    public doctorService:DoctorService
    ) {
      
     }

  ngOnInit(): void {
    //this.auth.verficarLogin();
  }
  async verification(){
    try{
      await this.auth.googleAuth()
      .then( data => {
        this.guardarDoctor(data.user.email);
        this.goDashboard();        
      });
    }catch(e:any){
      //alert(e.message)
    }
  }
  async login(user:string,pass:string){
    try{
      await this.auth.login(user,pass)
      .then(data =>{
        //console.log(data);

        if (data.user.emailVerified){
          this.guardarDoctor(data.user.email);
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
  public guardarDoctor(email:string){
    this.doctorService.createDoctor(email);
  }

}
