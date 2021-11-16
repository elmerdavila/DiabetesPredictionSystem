import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SesionLoginComponent } from './pages/sesion/sesion-login/sesion-login.component';
import { SesionRegisterComponent } from './pages/sesion/sesion-register/sesion-register.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './pages/home/toolbar/toolbar.component';
import { AngularFireModule } from '@angular/fire'; //coneccion a componentes generale sde firebase
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore'; //conecciona firestore
import { AngularFireAuthModule } from '@angular/fire/auth'; //coneccion al autenticador de firebase 



@NgModule({
  declarations: [
    AppComponent,
    SesionLoginComponent,
    SesionRegisterComponent,
    HomeComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),    
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
