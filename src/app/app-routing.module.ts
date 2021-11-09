import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SesionLoginComponent } from './pages/sesion/sesion-login/sesion-login.component';
import { SesionRegisterComponent } from './pages/sesion/sesion-register/sesion-register.component';

const routes: Routes = [
  {
    path: 'administracion',
    loadChildren:() => import ('./pages/admin/admin.module').then(m => m.AdminModule),

  },
 
  {path: 'iniciarSesion', component:SesionLoginComponent},
  {path: 'registrarse', component:SesionRegisterComponent},
  {path: 'home', component:HomeComponent},
  {path: '',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
