import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  name:string = 'Administrador'
  constructor(
    private router:Router,
    public auth_:AuthService
    ) { 
      this.auth_.devolverUsuario()
      .then(data =>{
        if (data != null ){
          this.name = data.displayName;
        }else{
          this.router.navigate(['/iniciarSesion'])
        }        
      });
    }
  ngOnInit(): void {

  }

  async logOut(){
    try{
      await this.auth_.logOut()
      .then(data =>{
        console.log(data);
        this.router.navigate(['/home'])
      })
      
    }catch (e:any) {
      alert(e.message)
    }
  }

}
